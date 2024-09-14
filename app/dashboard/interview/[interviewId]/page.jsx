"use client"

import React,{useEffect, useState} from 'react';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Webcam from 'react-webcam';
import { WebcamIcon } from 'lucide-react';

function Interview({params}) {
    const [interviewData,setInterviewData]=useState();
    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])
    const [webCamEnabled,setWebCamEnabled]=useState(false);
 //Get details by Mock Id
    const GetInterviewDetails=async()=>{
        const result=await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
       
    setInterviewData(result[0]);
}
  return (
    <div className='my-10 flex justify-center flex-col items-center'>
    <h2 className='font-bold text-2xl'>Let's Get Started</h2>
    <div>
  {webCamEnabled?<Webcam
  onUserMedia={()=>setWebCamEnabled(true)}
  onUserMediaError={()=>setWebCamEnabled(false)} style={{
    height:300,width:300}}/>:
<>
  <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
   <Button>Enable Web Cam and Microphone</Button> 
   </>}
    </div>
  
    
    </div>
  )
}

export default Interview