// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState } from 'react';
import { motion  } from 'framer-motion';


import './Vote.css'
import done from '../../imgs/Done.svg'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Skeleton } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function Vote({details, loading}) {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);

    const handleFormSubmit = () => {

    }

  return (
    <motion.div layout className="Vote" onClick={() => setIsOpen(!isOpen)}>
        {loading
            ?<Skeleton variant='text' width={'60%'} sx={{fontSize: '3rem'}}/> 
            :<motion.h2 layout="position">{details.has_voted?"شما رای داده‌اید":"شرکت در نظرسنجی"}</motion.h2>}
        {isOpen && !loading && details?.options && <>{details.has_voted
            ? <motion.img src={done} alt="You've done it!" style={{
                maxHeight: '45%',
                maxWidth: '45%',
                height: 'auto',
                width: 'auto'
                }}/>
            :<motion.div className="voteForm" onClick={(event) => event.stopPropagation()}>
                <FormControl required>
                {details.is_multi_option
                    ? <>

                    
                    </>
                    : <>
                        <FormLabel id='group-label'>یک گزینه را انتخاب  کنید:</FormLabel>
                        <RadioGroup
                            aria-required
                            aria-labelledby='group-label'
                            name="vote"
                        >
                            {details.options.map((opt, id) => 
                                <FormControlLabel key={id} value={id} control={<Radio />} label={opt.text} />
                            )}
                        </RadioGroup>
                    </>}
                </FormControl>
                <Button variant='outlined'
                    sx={{color: "white", borderColor: "white"}}>
                    رای بده
                    {/* TODO: Dialog to confirm */}
                </Button>
            </motion.div>}</>}
    </motion.div>
  )
}

export default Vote