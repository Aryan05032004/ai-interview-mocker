"use client"
import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"; 
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
const router=useRouter();
import moment from 'moment/moment';

const AddNewInterview = () => {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobExperience, setJobExperience] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobPosition, setJobPosition] = useState('');
    const [Loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();

    const onSubmit =async(e) => {
        setLoading(true)
        e.preventDefault();
        console.log(jobDesc, jobExperience, jobPosition);
        const InputPrompt="Job position: "+jobPosition+", Job Description:"+jobDesc+", Years of Experience:"+jobExperience+", Depends on Job Position,Job Description and Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview question along with Answer in JSON format, Give us question and answer field on JSON"
        // Close the dialog after form submission

        const result= await chatSession.sendMessage(InputPrompt)
        const MockJsonResp = (await result.response.text())
  .replace('```json', '')
  .replace('```', '');

console.log(JSON.parse(MockJsonResp));
setJsonResponse(MockJsonResp);
if(MockJsonResp)
{const resp = await db.insert(MockInterview).values({
    mockId:uuidv4(),
    jsonMockResp:MockJsonResp,
    jobPosition:jobPosition,
    jobDesc:jobDesc,
    jobExperience:jobExperience,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    createdAt:moment().format('DD-MM-yyyy')
}).returning({mockId:MockInterview.mockId});
console.log("Inserted Id:",resp)}
else{console.log("ERROR")

}

if(resp){
    setOpenDailog(false);
    router.push('/dashboard/interview/'+resp[0]?.mockId)
}
  setLoading(false);

        
    };

    return (
      
            <div>
                <div className='p-10 border-rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                    onClick={() => setOpenDailog(true)}>
                    <h2 className='text-lg'> + Add New</h2>
                </div>

                <Dialog open={openDailog}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">Tell us more about your job interview</DialogTitle>
                            <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job role, job description, and years of experience</h2>
                                    <div className='mt-7 my-3'>
                                        <label>Job Role</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            value={jobPosition}  // bind value to state
                                            onChange={(event) => setJobPosition(event.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className='my-3'>
                                        <label>Job Description</label>
                                        <Textarea
                                            placeholder="Ex. React, Angular, NodeJs, MySql, etc"
                                            value={jobDesc}  // bind value to state
                                            onChange={(event) => setJobDesc(event.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className='my-3'>
                                        <label>Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            value={jobExperience}  // bind value to state
                                            onChange={(event) => setJobExperience(event.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => { setOpenDailog(false) }}>Cancel</Button>
                                    <Button type="submit" disabled={Loading}>
                                    {Loading?
                                        <>
                                    <LoaderCircle className='animate-spin'/>'Generating from AI'</>:'Start Interview'
                                    }
                                    </Button>
                                </div> 
                                 </form>
                            </DialogDescription>
                            
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
      
    )
}

export default AddNewInterview;
