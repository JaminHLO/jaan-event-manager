const { AuthenticationError } = require('apollo-server-express');
const { User, Club, Event, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51NNi4mBTDevFCiGQDfSeVUSvfxZMJcfmiFWDqydSc1tsNQboBAHhqVqWAbZdvUucicOYARzKtjplgKatONL4hxpf00AEUi6nB1');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    clubs: async (parent, { category, title }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (title) {
        params.name = {
          $regex: title
        };
      }

      return await Club.find(params).populate('category').populate('events');
    },
    club: async (parent, { _id }) => {
      return await Club.findById(_id).populate('category').populate('events');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.clubs',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.clubs',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('myClubs').populate('myEvents');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ clubs: args.clubs });
      const line_items = [];

      const { clubs } = await order.populate('clubs');

      for (let i = 0; i < clubs.length; i++) {
        const singleClub = await stripe.products.create({
          name: clubs[i].title,
          description: clubs[i].description,
          images: [`${url}/image/${clubs[i].image}`]
        });
        const price = await stripe.prices.create({
          product: singleClub.id,
          unit_amount: clubs[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });
      return { session: session.id };
    },
    // Update args
    myEvents: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('myEvents')
      }
      throw new AuthenticationError('Please log in first')
    },
    event: async (parent, { _id }) => {
      return await Event.findById(_id)
    },
    searchEvents: async (parent, { eventQuery }, context) => {
      const filteredEvents = await Event.find({ title: { $regex: eventQuery } })
        .populate({path: "clubId",
          populate: {
            path: "category"
          }})

      console.log(filteredEvents)
      return filteredEvents;
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { clubs }, context) => {
      if (context.user) {
        const order = new Order({ clubs });
        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, { user }, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(
          context.user._id,
          { ...user },
          { new: true }
        )
      }

      throw new AuthenticationError('Not logged in');
    },
    buyMembership: async (parent, { _id, spotsAvailable }) => {
      const decrement = Math.abs(spotsAvailable) * -1;

      return await Club.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    createClub: async (parent, club, context) => {
      if (context.user) {
        const newClub = await Club.create(
          { ...club, adminId: context.user._id }
        )

        if (newClub) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { myClubs: newClub._id } },
            { new: true }
          )
        }
        return newClub
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    addEvent: async (parent, { event, clubId }, context) => {
      if (context.user) {
        const newEvent = await Event.create({ ...event, clubId: clubId });
        const updatedClub = await Club.findOneAndUpdate(
          { _id: clubId },
          { $addToSet: { events: newEvent._id } },
          { new: true }
        )
        return newEvent
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    updateEvent: async (parent, { eventId, event }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findByIdAndUpdate(
          eventId,
          { ...event },
          { new: true }
        )
        return updatedEvent
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    updateClub: async (parent, { clubId, club }, context) => {
      if (context.user) {
        const updatedClub = await Club.findByIdAndUpdate(
          clubId,
          { ...club },
          { new: true }
        )
        return updatedClub
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    joinClub: async (parent, { clubId }, context) => {
      const userId = context.user._id
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          { $addToSet: { myClubs: clubId } },
          { new: true }
        )
        const updatedClub = await Club.findOneAndUpdate(
          { _id: clubId },
          { $addToSet: { members: userId } },
          { new: true }
        )
        return updatedClub
      }
      throw new AuthenticationError('Incorrect credentials');
    },
    joinEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const userId = context.user._id
        const currentUser = await User.findById({ _id: userId })
        const currentEvent = await Event.findById({ _id: eventId })
        const userClubs = currentUser.myClubs
        const currentClubId = currentEvent.clubId.toString()
        const clubCheck = userClubs.some((clubId) => clubId.toString() === currentClubId)
        if (clubCheck) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { myEvents: eventId } },
            { new: true }
          )
          const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId },
            { $addToSet: { participants: userId } },
            { new: true }
          )
          return updatedEvent
        } else {
          console.log("NOT IN CLUB")
          return;
        }
      }
      throw new AuthenticationError('Incorrect credentials');
    },
  }
};

module.exports = resolvers;
