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
=> now i will save users data in DB: create a saveuserindb() and use it in signin and sign up function
=> at the same time create an api to get all users from db by admin, so that i can use it latter.
=> i will create 'become a host' option(which is already done by vaia)
    - when user will click on 'become a host' button a modal will open
    - when i click on the ok btn my status will be requested




























*/