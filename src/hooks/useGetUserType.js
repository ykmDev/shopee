export default function useGetUserType (user, current_event) {
    let user_type = 0
    console.log(user, current_event)
    if(user.events) {
      user.events.map((event)=>{
        if(event.id == current_event?.id) {
          user_type = event.pivot?.user_type
        }
      })
    }

    return user_type
  }