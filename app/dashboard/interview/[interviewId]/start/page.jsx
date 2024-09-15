"use client"

import React, { useState, useEffect } from 'react';

import { db } from '@/utils/db';

import { eq } from 'drizzle-orm';
import { MockInterview } from '@/utils/schema';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';


function StartInterview({params}) {

    const [interviewData, setInterviewData] = useState();
const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
const [activeQuestionIndex,setActiveQuestionIndex]=useState(0)
    useEffect(()=>{
   GetInterviewDetails();
    },[]);


        const GetInterviewDetails = async () => {
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
            if (result.length > 0) {
              const jsonMockResp = JSON.parse(result[0].jsonMockResp);
              console.log(jsonMockResp);
              setMockInterviewQuestion(jsonMockResp);
              setInterviewData(result[0]);
            } else {
              console.error('No interview data found');
            }
          };
          
  return (
    <div>

<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
{/* //question */}
<QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
    activeQuestionIndex={activeQuestionIndex}
/>

  <RecordAnswerSection/>


</div>




    </div>
  )
}

export default StartInterview
