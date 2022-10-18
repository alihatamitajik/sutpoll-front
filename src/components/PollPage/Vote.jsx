// Copyright (c) 2022 Ali Hatami
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useEffect, useState } from 'react';
import { motion  } from 'framer-motion';


import './Vote.css'
import done from '../../imgs/Done.svg'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Skeleton } from '@mui/material';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { CheckBox } from '@mui/icons-material';
import { urls } from '../../api/urls';
import { toast } from 'react-toastify';

function Vote({details, setDetails, loading}) {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [vote, setVote] = useState(-1);
    const [err, setErr] = useState(false);
    const [multiChecked, setMultiChecked] = useState({})

    useEffect(() => {
            if(details.options){
                setMultiChecked(Object.fromEntries(details.options?.map(opt => [opt.id, false])))
                console.log(multiChecked);
            }
    }, [details])
    
    const handleFormSubmit = async () => {
        handleClose();
        let votes = [];

        if (details.is_multi_option) {
            for (var option in Object.keys(multiChecked)) {
                if (multiChecked[option])
                    votes.push(option)
            }
        } else {
            votes.push(vote);
        }

        console.log(details.options)
        console.log(votes)

        const id = toast.loading("در حال ثبت رای");

        try {
            await axiosPrivate.post(urls.vote(), JSON.stringify({poll_slug:details.slug, options: votes}));
            toast.update(id, {render: "رای با موفقیت ثبت شد.", type: "success", isLoading: false, autoClose: 3000})
            setDetails({...details, has_voted: true})
        } catch (err) {
            if (!err?.response) {
                toast.update(id, {render: "سرور مورد نظر در حال حاضر قادر به پاسخگویی نمی‌باشد :)", type: "error", isLoading: false, autoClose: 3000})
            } else if (err?.response?.data?.error) {
                toast.update(id, {render: err?.response?.data?.error, type: "error", isLoading: false, autoClose: 3000})
            } else {
                toast.update(id, {render: "به توسعه‌دهنده مراجعه کنید 😨", type: "error", isLoading: false, autoClose: 3000})
            }
        }
    }

    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const handleOpen = (event) => {
        /* validate */
        event.preventDefault()
        if (details.is_multi_option) {
            if (event.target.checked) {
                console.log(event.target.value);
            }
        } else {
            if (vote === -1) {
                setErr(true);
            } else {
                setIsDialogOpen(true);
            }
        }
    }

    const handleMultiChange = (event) => {
        console.log(event.target.checked);
    }

    const handleRadioChange = (event) => {
        setVote(event.target.value);
        setErr(false);
    }

  return (
    <motion.div layout className="Vote" onClick={() => setIsOpen(!isOpen)}>
        {loading
            ?<Skeleton variant='text' width={'60%'} sx={{fontSize: '3rem'}}/> 
            :<motion.h2 layout="position">{details.has_voted?"شما رای داده‌اید":"شرکت در نظرسنجی"}</motion.h2>}
        {isOpen && !loading && details?.options && <>{details.has_voted
            ? <motion.img src={done} alt="You've done it!" style={{
                maxHeight: '60%',
                maxWidth: '60%',
                height: 'auto',
                width: 'auto'
                }}/>
            :<motion.div className="voteForm" onClick={(event) => event.stopPropagation()}>
                <FormControl required error={err}>
                {details.is_multi_option
                    ? <>
                        <FormLabel id='group-label'>یک یا چند گزینه را انتخاب  کنید:</FormLabel>
                        <FormGroup aria-labelledby='group-label'>
                            {details.options.map((opt, id) => 
                                <FormControlLabel key={id} value={opt.id} control={
                                    <CheckBox />}
                                label={opt.text} />
                            )}
                        </FormGroup>
                    </>
                    : <>
                        <FormLabel id='group-label'>یک گزینه را انتخاب  کنید:</FormLabel>
                        <RadioGroup
                            aria-required
                            aria-labelledby='group-label'
                            name="vote"
                            value={vote}
                            onChange={handleRadioChange}    
                        >
                            {details.options.map((opt, id) => 
                                <FormControlLabel key={id} value={opt.id} control={<Radio />} label={opt.text} />
                            )}
                        </RadioGroup>
                    </>}
                </FormControl>
                <Button variant='outlined' onClick={handleOpen}
                    sx={{color: "white", borderColor: "white"}}>
                    رای بده
                </Button>
                <Dialog
                    open={isDialogOpen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{direction: 'rtl!important'}}
                >
                    <DialogTitle id="alert-dialog-title">
                    {"آیا از رای خود اطمینان دارید؟"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        توجه داشته باشید که با توجه به سیاست مخفی ماندن شخص رای دهنده، داده‌ای
                        از شخص رای دهنده در سیستم ثبت نخواهد شد به همین دلیل در آینده شما امکان
                        تغییر رای و یا حذف آن را نخواهید داشت.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>انصراف</Button>
                    <Button onClick={handleFormSubmit} autoFocus>
                        ثبت رای
                    </Button>
                    </DialogActions>
                </Dialog>
            </motion.div>}</>}
    </motion.div>
  )
}

export default Vote