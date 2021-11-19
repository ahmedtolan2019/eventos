const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Booking{
  _id:ID!
  event:Event!
  user:User!
  createdAt:String!
  updatedAt:String!
}

type Event{
    _id:ID!
    title:String!
    description:String!
    price:Float!
    date:String!
    creator:User!
    noOfBookings:Int!
}

type User{
    _id:ID!
    email:String!
    password:String
    createdEvents:[Event!]
}

type AuthData{
  userId:ID!
  token:String!
  tokenExpiration:Int!
}
type logout{
  userId:ID!
  logoutAt:String!
  message:String!
}
input UserInput{
   email:String!
   password:String!
}
 type RootQuery {
   events(size:Int!, creatorId:ID): [Event!]
   event(eventId:ID!):Event!

   bookings(userId:ID!):[Booking!]
   login(email:String!, password:String!):AuthData!
   
 }
 input EventInput{
   title:String!
    description:String!
    price:Float!
    date:String!
 }
 input EditEventInput{
   eventId:ID!
   title:String!
    description:String!
    price:Float!
    date:String!
 }
 type UpdatedEventData{
   eventId:ID!
   message:String!
   updatedAt:String!
 }
 type DeletedEventData{
   eventId:ID!
   message:String!
   deletedAt:String!
 }
 
 type RootMutation {
   createEvent(eventInput: EventInput): Event!
   editEvent(eventInput: EditEventInput): UpdatedEventData!
   deleteEvent(eventId:ID!):DeletedEventData!
   createUser(userInput: UserInput):User!
   bookEvent(eventId: ID!):Booking!
   cancelBooking(bookingId:ID!):Event!
   logout:logout!
 }

 schema {
   query: RootQuery
   mutation: RootMutation
 }
`);
