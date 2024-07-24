import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Box, Typography, styled, TextField, Button, Select, MenuItem } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, } from 'react-redux';
import { setWeight, setHeight, setRace } from '../../../reducers/updateProfileSlice';


const FlexCont = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))



const heightList = [
    "3'9\"",
    "4'0\"",
    "4'1\"",
    "4'2\"",
    "4'3\"",
    "4'4\"",
    "4'5\"",
    "4'6\"",
    "4'7\"",
    "4'8\"",
    "4'9\"",
    "4'10\"",
    "4'11\"",
    "5'0\"",
    "5'1\"",
    "5'2\"",
    "5'3\"",
    "5'4\"",
    "5'5\"",
    "5'6\"",
    "5'7\"",
    "5'8\"",
    "5'9\"",
    "5'10\"",
    "5'11\"",
    "6'0\"",
    "6'1\"",
    "6'2\"",
    "6'3\"",
    "6'4\"",
    "6'5\"",
    "6'6\"",
    "6'7\"",
    "6'8\"",
    "6'9\"",
    "6'10\"",
    "6'11\"",
    "7'0\"",
    "7'1\"",
    "7'2\"",
    "7'3\"",
    "7'4\"",
    "7'5\""
]

const weightList = [
    "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
    "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
    "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
    "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
    "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
    "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",
    "100", "101", "102", "103", "104", "105", "106", "107", "108", "109",
    "110", "111", "112", "113", "114", "115", "116", "117", "118", "119",
    "120", "121", "122", "123", "124", "125", "126", "127", "128", "129",
    "130", "131", "132", "133", "134", "135", "136", "137", "138", "139",
    "140", "141", "142", "143", "144", "145", "146", "147", "148", "149",
    "150", "151", "152", "153", "154", "155", "156", "157", "158", "159",
    "160", "161", "162", "163", "164", "165", "166", "167", "168", "169",
    "170", "171", "172", "173", "174", "175", "176", "177", "178", "179",
    "180", "181", "182", "183", "184", "185", "186", "187", "188", "189",
    "190", "191", "192", "193", "194", "195", "196", "197", "198", "199",
    "200", "201", "202", "203", "204", "205", "206", "207", "208", "209",
    "210", "211", "212", "213", "214", "215", "216", "217", "218", "219",
    "220", "221", "222", "223", "224", "225", "226", "227", "228", "229",
    "230", "231", "232", "233", "234", "235", "236", "237", "238", "239",
    "240", "241", "242", "243", "244", "245", "246", "247", "248", "249",
    "250", "251", "252", "253", "254", "255", "256", "257", "258", "259",
    "260", "261", "262", "263", "264", "265", "266", "267", "268", "269",
    "270", "271", "272", "273", "274", "275", "276", "277", "278", "279",
    "280", "281", "282", "283", "284", "285", "286", "287", "288", "289",
    "290", "291", "292", "293", "294", "295", "296", "297", "298", "299",
    "300", "301", "302", "303", "304", "305", "306", "307", "308", "309",
    "310", "311", "312", "313", "314", "315", "316", "317", "318", "319",
    "320", "321", "322", "323", "324", "325", "326", "327", "328", "329",
    "330", "331", "332", "333", "334", "335", "336", "337", "338", "339",
    "340", "341", "342", "343", "344", "345", "346", "347", "348", "349",
    "350", "351", "352", "353", "354", "355", "356", "357", "358", "359",
    "360", "361", "362", "363", "364", "365", "366", "367", "368", "369",
    "370", "371", "372", "373", "374", "375", "376", "377", "378", "379",
    "380", "381", "382", "383", "384", "385", "386", "387", "388", "389",
    "390", "391", "392", "393", "394", "395", "396", "397", "398", "399",
    "400", "401", "402", "403", "404", "405", "406", "407", "408", "409",
    "410", "411", "412", "413", "414", "415", "416", "417", "418", "419",
    "420", "421", "422", "423", "424", "425", "426", "427", "428", "429",
    "430", "431", "432", "433", "434", "435", "436", "437", "438", "439",
    "440", "441", "442", "443", "444", "445", "446", "447", "448", "449",
    "450", "451", "452", "453", "454", "455", "456", "457", "458", "459",
    "460", "461", "462", "463", "464", "465", "466", "467", "468", "469",
    "470", "471", "472", "473", "474", "475", "476", "477", "478", "479",
    "480", "481", "482", "483", "484", "485", "486", "487", "488", "489",
    "490", "491", "492", "493", "494", "495", "496", "497", "498", "499",
    "500"
]


export default function BodyDetailsStep({ onNext, baseUrl, dispatch, access_token }) {

    const height = useSelector(state => state.profile.height)
    const weight = useSelector(state => state.profile.weight)
    const race = useSelector(state => state.profile.race)
    //const [heightUnit, setHeightUnit] = useState('cm')
    const [weightUnit, setWeightUnit] = useState('kg')
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState('')

    const [raceData, setRaceData] = useState([])

    console.log(height)
    console.log(weight)

    useEffect(() => {


        const fetchRace = async () => {


            try {

                const response = await axios.get(`${baseUrl}/api/v1/user/races`)
                console.log(response.data)

                if (response?.data?.isSuccess) {
                    setRaceData(response.data.responseData.races)
                }
            }
            catch (error) {
                console.error('catch block error', error)
            }

        }

        fetchRace()

    }, [])

    const handleNext = async () => {


        if (!height || !weight || !race) {
            setError("All fields are required")
            return
        }
        else {
            try {

                console.log('height', height)
                console.log('weight', weight)

                setLoading(true)
                const response = await axios.patch(`${baseUrl}/api/v1/user/me`,
                    {
                        height: height,
                        weight: weight + weightUnit,
                        race_id: race
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    }
                )

                if (response.data.isSuccess) {
                    onNext()
                }
                setLoading(false)



            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <FlexCont sx={{ flexDirection: 'column', width: '100%' }}>
            <Typography sx={{ fontSize: { xs: '24px', sm: '30px' }, fontFamily: 'fontRegular' }}>
                Pick your details
            </Typography>
            <Box component='form' sx={{ width: { xs: '90%', sm: '50%', lg: '40%' }, mt: 4 }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, my: 1 }}>
                    <Select
                        fullWidth
                        size='small'
                        displayEmpty
                        placeholder='Select your race'
                        value={height}
                        onChange={e => dispatch(setHeight(e.target.value))}
                        sx={{ my: 1 }}
                        renderValue={(ht) => {
                            if (!ht) {
                                return <em style={{ color: "#a3a3a3" }}> Select Your Height</em>;
                            }

                            return ht
                        }}

                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null
                        }}
                    >
                        {heightList && heightList.map((height, index) => (
                            <MenuItem key={index} value={height}>{height}</MenuItem>
                        ))}
                    </Select>
                    {/* <TextField
                        fullWidth
                        placeholder='Enter your height'
                        value={height}
                        onChange={e => dispatch(setHeight(e.target.value))}
                    /> */}
                    {/* <Select
                        size='small'
                        value={heightUnit}
                        onChange={e => setHeightUnit(e.target.value)}
                    >
                        <MenuItem value='in'>in</MenuItem>
                        <MenuItem value='cm'>cm</MenuItem>
                    </Select> */}
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, my: 1 }}>
                    {/* <TextField
                        fullWidth
                        placeholder='Enter your weight'
                        value={weight}
                        onChange={e => dispatch(setWeight(e.target.value))}
                    />
                    */}
                    <Select
                        fullWidth
                        size='small'
                        displayEmpty
                        value={weight}
                        onChange={e => dispatch(setWeight(e.target.value))}
                        sx={{ my: 1 }}
                        renderValue={(wt) => {
                            if (!wt) {
                                return <em style={{ color: "#a3a3a3" }}> Select Your Weight</em>;
                            }

                            return wt
                        }}
                    >
                        {weightList && weightList.map((weight, index) => (
                            <MenuItem key={index} value={weight}>{weight}</MenuItem>
                        ))}
                    </Select>

                    <Select
                        size='small'
                        value={weightUnit}
                        onChange={e => setWeightUnit(e.target.value)}
                    >
                        <MenuItem value='kg'>kg</MenuItem>
                        <MenuItem value='lbs'>lbs</MenuItem>
                    </Select>
                </Box>

                <Select
                    fullWidth
                    size='small'
                    displayEmpty
                    placeholder='Select your race'
                    value={race}
                    onChange={e => dispatch(setRace(e.target.value))}
                    sx={{ my: 1 }}
                    renderValue={(selectedRaceId) => {
                        if (!selectedRaceId) {
                            return <em style={{ color: "#a3a3a3" }}> Select Your Race</em>;
                        }

                        const selectedRaceObject = raceData.find((race) => race.ID === selectedRaceId);

                        return selectedRaceObject ? selectedRaceObject.Race : null;
                    }}
                >
                    {raceData && raceData.map((race) => (
                        <MenuItem key={race.ID} value={race.ID}>{race.Race}</MenuItem>
                    ))}
                </Select>



            </Box>
            {error && error.length > 0 &&
                <Typography color='red'>
                    {error}
                </Typography>
            }

            <Button variant='contained' sx={{ mt: '5rem', width: { xs: '90%', sm: '60%', md: '40%', lg: '30%' }, borderRadius: '100px', backgroundColor: '#006BFA' }} onClick={handleNext}>
                {loading && <CircularProgress size="1.5rem" sx={{ color: "#fff", mr: 2 }} />}Next</Button>


        </FlexCont>
    )
}
