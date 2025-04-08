import { NextResponse } from "next/server";
import Users from "../../../../services/invitation.services.";


export async function GET( req , { params } ){
   const getInvitation = await Users.getById( params.id )
   if( !getInvitation ){
      return NextResponse.json({ ERROR : "CANNOT GET INVITATION" })
   }
   else{
      return NextResponse.json({ message : getInvitation })
   }
}

export async function PUT( req , { params } ){
   const guest = await req.json()
   if( !guest && !guest.email && !params.id ){
      return NextResponse.json({ ERROR : "CANNOT ADD GUEST, EMAIL REQUIRED" })
   }
   else{
      const verifyEmail = await Users.getGuestByEmail( params.id , guest.email )
      if( !verifyEmail ){
         const addGuest = await Users.updateGuests( params.id , guest )
         if( !addGuest ){
            return NextResponse.json({ ERROR : "CANNOT ADD GUEST" })
         }
         else{
            return NextResponse.json({ MESSAGE : "200OK" })
         }
      }
      else{
         return NextResponse.json({ ERROR_EMAIL : "EMAIL ALREADY EXISTS" })
      }
   }
}

