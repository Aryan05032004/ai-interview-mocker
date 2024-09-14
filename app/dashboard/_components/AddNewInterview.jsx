"use client"
import React, { useState } from 'react'
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

const AddNewInterview = () => {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobExperience, setJobExperience] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobPosition, setJobPosition] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(jobDesc, jobExperience, jobPosition);
        const InputPrompt="Job position: Full Stack Developer, Job Description:React,"
        // Close the dialog after form submission
        
    };

    return (
        <form onSubmit={onSubmit}>
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
                                    <Button type="submit">Start Interview</Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </form>
    )
}

export default AddNewInterview;
