// Copyright (c) 2022 Ali Hatami
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React from 'react'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Button,
    Container,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid, IconButton, InputAdornment,
    InputLabel,
    MenuItem, OutlinedInput,
    Select,
    TextField, FormHelperText
} from "@mui/material";
import {DatePicker} from "@mui/x-date-pickers";

function Create() {

    const [data, setData] = React.useState({
        title: '',
        description: '',
        is_multi_option: false,
        access_time: new Date(),
        end_time: new Date(),
        show_mode: '',
        options: []
    });

    const [option, setOption] = React.useState('')
    const [error, setError] = React.useState({
        message: '',
        component: ''
    })

    const optionTyped = (e) => {
        if (e.keyCode === 13) {
            submitNewOption()
        }
    }

    const submitNewOption = () => {
        setData({...data, options: [...data.options, option]})
        setOption('')
    }

    const deleteOption = (text) => {
        setData({...data, options: data.options.filter(item => item !== text)})
    }

    const onSubmit = () => {
        if(!checkRequiredFields())
            return
        usePrivateAx
    }

    const checkRequiredFields = () => {
        if (data.title === '') {
            setError({message: "این فیلد اجباری است", component: "name"})
            return false
        }
        if (data.show_mode === '') {
            setError({message: "این فیلد اجباری است", component: "show_mode"})
            return false
        }
        if (data.options.length < 2) {
            setError({message: 'حداقل دو گزینه وارد کنید', component: "option"})
            return false
        }
        return true
    }

    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <TextField
                        variant='outlined'
                        required
                        fullWidth
                        placeholder='نام'
                        error={error.component === 'name'}
                        helperText={error.component === 'name' ? error.message : ''}
                        value={data.title}
                        onChange={(e) => setData({...data, title: e.target.value})}
                    />
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControl
                        fullWidth
                        error={error.component === 'show_mode'}
                    >
                        <InputLabel id="show-mode-label">نمایش نتایج</InputLabel>
                        <Select
                            labelId='show-mode-label'
                            value={data.show_mode}
                            label="نمایش نتایج"
                            onChange={(e) => setData({...data, show_mode: e.target.value})}
                        >
                            <MenuItem value={"show"}>همواره</MenuItem>
                            <MenuItem value={"hidden"}>هیچوقت</MenuItem>
                            <MenuItem value={"after_finish"}>پس از اتمام نظرسنجی</MenuItem>
                        </Select>
                        <FormHelperText>{error.component === 'show_mode' ? error.message : ''}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={6} md={4}>
                    <FormControlLabel
                        label="چند گزینه‌ای"
                        control={
                            <Checkbox
                                checked={data.is_multi_option}
                                onChange={(e) => setData({...data, is_multi_option: e.target.checked})}
                            />
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant='outlined'
                        multiline
                        fullWidth
                        rows={5}
                        placeholder='توضیحات'
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DatePicker
                        variant='outlined'
                        inputFormat="DD/MM/YYYY"
                        label='تاریخ شروع'
                        value={data.access_time}
                        onChange={(value) => setData({...data, access_time: value})}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <DatePicker
                        variant='outlined'
                        inputFormat="DD/MM/YYYY"
                        label='تاریخ پایان'
                        value={data.end_time}
                        onChange={(value) => setData({...data, end_time: value})}
                        renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth error={error.component === 'option'}>
                        <OutlinedInput
                            variant='outlined'
                            fullWidth
                            placeholder='افزودن گزینه'
                            value={option}
                            onKeyDown={optionTyped}
                            onChange={(e) => setOption(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={submitNewOption}
                                        edge="end"
                                    >
                                        <CheckCircleOutlineIcon/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{error.component === 'option' ? error.message : ''}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container xs={12}>
                    {data.options.map((item, index) =>
                        <Grid item xs={6} md={4} key={index}>
                            <OutlinedInput
                                disabled
                                variant='outlined'
                                fullWidth
                                value={item}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => deleteOption(item)}
                                            edge="end"
                                        >
                                            <DeleteForeverIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={12} md={3} alignSelf={'end'}>
                    <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        onClick={onSubmit}
                    >
                        ثبت نظرسنجی
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Create
