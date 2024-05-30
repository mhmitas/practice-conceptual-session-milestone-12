/*
## Working in add room page:
~ DID: i have collected all data from the add room form. Such as --> implement date-range and get dates from date-range-input + upload image to the imgBB and get link + created an api to the server and send post request using useMutation hook. 

~ Now i will post a room to the database 
 => use useMutation hook and post a room ;

~ show room detail in room detail page.

///////////////////////////////////
// Session part 2: Video 3 + 4:  // from live session
///////////////////////////////////
## complete vabe ekti room db te post kori.
=> jokhon user save btn e click korbe toknon form ke disable kore dibo --> at same time error, success message and redirect gulo ke fix kore dibo

## Working in my listing page:
=> show all posted room by host: in my listing page ✓
=> add functionality: delete ✓ | and update room(call api using useMutation) , and before delete and update ask confirmation and use headless modal .
=> room detail page valid date info showing.(from session 2.4 32:15[show data in range calaender])✓
=> ekhon ami start date and end date er middle er difference dekhte chia. so i will use 'Date-fns'[differenceInCalendarDays] and show total price.✓
=> now i will save users data in DB: create a saveuserindb() and use it in signin and sign up function ✓
=> at the same time create an api to get all users from db by admin, so that i can use it latter.
=> i will create 'become a host' option(which is already done by vaia) 
    - when user will click on 'become a host' button a modal will open
    - when i click on the ok btn my status will be requested 


////////////////////////////////
// Conceptual Sessions Part 3 // ✓
////////////////////////////////
[v-1]
=> First Users er role gulo fix kore dibo
 - create a hook, which will fetch user. so that i can use this hook from anywhere and get the users role.
 - before useing role for connditional rendaring: create a component for navlinks and reuse this component for navlinks && work in profile page [Home task: work with update password and change password ]
[v-2]
=> user role: conditional rendering based on users role: show menu items based on role
=> work in admin route: create a manage users page and show all users -->...[v-3]...create an api for update user role and  when click on update role button show a modal with checklist, and when click update btn, update user role in database 
[v-3]--> add some velidation
=> implement toggle between ( guest <--> host ): ...[v-4]...  
=> now i will secure all routes in client side which needed to be secure . wrapping them in privet + admin + host routes
=> Next i will secure some routes from client side, so that those who is allow to access the route/api only he can access it: create a verifyAdmin middleware in server -> create an verifyHost middleware
=> now i will make functional become a host button which is in the guest's dashboard.: 
=> now i will work with room booking: create modal with booking information. reserve will do next day.
=> Next work in mybookings page: create mybookins page, copy paste code form resources -> setup a route ->   



























*/