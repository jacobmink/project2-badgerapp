# project2-badgerapp
Badger Dating App

USER STORY

User logs in, sees their profile. User can keyword search badges from a badge database. If a badge doesn't exist, user can create a badge. Created badges need to be approved by admin. To gain the badge, user needs to input three instances of badge activity (MVP input is text description of badge activity). 


MVP LINE --------------------------------------


User can filter array of all users by badge type. User is shown photos of filtered users, and has the ability to swipe right or left. If two users both swipe right on each other, messaging is enabled.

Post-meetup experience: Users can rate and review dated user. Reviews/ratings about a user are only seen if match occurs.

Flag user: If a user gets flagged, admin takes action with both flagger user and flagged user. Further necessary action is taken. If flag is validated, flagged user is removed from searches, however they can still work to gain badges. This user will also be prompted by admin with data sources to remedy their behavior. If no activity is seen within 6 months, user is deleted from app.


--------------------------------------------------

MODELS/SCHEMAS

User: ({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    displayName: {type: String, required: true},
    badgeList: [{type: String}],
    flagged: {type: Boolean, required: true}
})