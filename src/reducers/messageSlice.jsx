import { createSlice } from "@reduxjs/toolkit";


import Image1 from '../assets/Attachment1.jpg'
import Image2 from '../assets/Attachment2.jpg'
import Image3 from '../assets/Attachment3.jpg'
import Image4 from '../assets/Attachment4.jpg'
import Image5 from '../assets/Attachment5.jpg'


import Avatar1 from '../assets/Avatar1.svg'
import Avatar2 from '../assets/Avatar2.svg'
import Avatar3 from '../assets/Avatar3.svg'
import Avatar4 from '../assets/Avatar4.svg'

const peopleList = [
    {
        avatar: Avatar1,
        name: 'Dinesh Khadka',
        lastMessage: 'Hey there, how have you been?',
        time: '2h',
        online: true,
        messages: [
            {
                sender: "user",
                content: "Hey there! How was your day?",
                timestamp: "2024-01-19T15:30:00"
            },
            {
                sender: "friend",
                content: "It was good, thanks! Just finished work. How about yours?",
                timestamp: "2024-01-19T15:35:00"
            },
            {
                sender: "user",
                content: "I'm thinking of trying that new restaurant downtown. Have you been there?",
                timestamp: "2024-01-19T16:00:00"
            },
            {
                sender: "friend",
                content: "Yes, I went last week. The food was amazing! You should definitely check it out.",
                timestamp: "2024-01-19T16:05:00"
            },
            {
                sender: "user",
                content: "Do you have any recommendations for a good book to read?",
                timestamp: "2024-01-19T17:20:00"
            },
            {
                sender: "friend",
                content: "Sure! Have you read 'The Night Circus' by Erin Morgenstern? It's a captivating fantasy novel.",
                timestamp: "2024-01-19T17:25:00"
            },
            {
                sender: "user",
                content: "I heard there's a meetup this weekend. Are you planning to go?",
                timestamp: "2024-01-19T18:45:00"
            },
            {
                sender: "friend",
                content: "Absolutely! I've been looking forward to it. It's a great opportunity to meet new people.",
                timestamp: "2024-01-19T18:50:00"
            },
            {
                sender: "user",
                content: "Just got tickets for the concert next month. Are you interested in joining?",
                timestamp: "2024-01-19T20:15:00"
            },
            {
                sender: "friend",
                content: "That sounds awesome! I'm in. Let me know the details, and we can plan it out.",
                timestamp: "2024-01-19T20:20:00"
            },
            {
                sender: "user",
                content: "I heard there's a meetup this weekend. Are you planning to go?",
                timestamp: "2024-01-19T18:45:00"
            },
            {
                sender: "friend",
                content: "Absolutely! I've been looking forward to it. It's a great opportunity to meet new people.",
                timestamp: "2024-01-19T18:50:00"
            },
            {
                sender: "user",
                content: "Just got tickets for the concert next month. Are you interested in joining?",
                timestamp: "2024-01-19T20:15:00"
            },
            {
                sender: "friend",
                content: "That sounds awesome! I'm in. Let me know the details, and we can plan it out.",
                timestamp: "2024-01-19T20:20:00"
            }
        ],
        attachments: [
            Image1, Image2, Image3
        ]
    },
    {
        avatar: Avatar3,
        name: 'Anurag Limbu',
        lastMessage: '',
        yourLastMessage: 'Ma hero chu?',
        time: '1h',
        online: false,
        messages: [
            {
                sender: "user",
                content: "Hey! Have you tried the new coffee shop downtown?",
                timestamp: "2024-01-20T09:45:00"
            },
            {
                sender: "co-worker",
                content: "Not yet! Is it good? I might swing by during lunch.",
                timestamp: "2024-01-20T09:50:00"
            },
            {
                sender: "user",
                content: "Absolutely! The coffee is amazing, and they have a cozy atmosphere.",
                timestamp: "2024-01-20T10:15:00"
            },
            {
                sender: "co-worker",
                content: "Nice! I'll check it out. Thanks for the recommendation.",
                timestamp: "2024-01-20T10:20:00"
            },
            {
                sender: "user",
                content: "Hey, did you see the movie trailers released yesterday? Exciting stuff!",
                timestamp: "2024-01-20T14:30:00"
            },
            {
                sender: "cinephile-friend",
                content: "Oh yes! I'm hyped! Let's plan a movie night soon.",
                timestamp: "2024-01-20T14:35:00"
            },
            {
                sender: "user",
                content: "Absolutely! I'm thinking Friday. What do you think?",
                timestamp: "2024-01-20T15:00:00"
            },
            {
                sender: "cinephile-friend",
                content: "Sounds perfect! Count me in.",
                timestamp: "2024-01-20T15:05:00"
            },
            {
                sender: "user",
                content: "Hey, I'm stuck at work. Any chance you could pick up groceries on your way home?",
                timestamp: "2024-01-21T17:45:00"
            },
            {
                sender: "roommate",
                content: "Sure thing! Send me the list, and I'll grab everything for dinner.",
                timestamp: "2024-01-21T17:50:00"
            }
        ],
        attachments: [
            Image1, Image4
        ]

    },
    {
        avatar: Avatar2,
        name: 'Aadarsha Lamichhane',
        lastMessage: 'My name is BomBom.',
        time: '4h',
        online: true,
        messages: [
            {
                sender: "user",
                content: "Hey, how's it going? Any exciting plans for the weekend?",
                timestamp: "2024-01-22T11:00:00"
            },
            {
                sender: "sibling",
                content: "Hey! Not much planned, maybe catching up on some shows. What about you?",
                timestamp: "2024-01-22T11:05:00"
            },
            {
                sender: "user",
                content: "Thinking of hiking on Saturday. Interested?",
                timestamp: "2024-01-22T11:30:00"
            },
            {
                sender: "sibling",
                content: "Sounds fun! Count me in. Let's make it a day to remember!",
                timestamp: "2024-01-22T11:35:00"
            },
            {
                sender: "user",
                content: "Hi there! I heard about a new art exhibition downtown. Would you like to check it out this Sunday?",
                timestamp: "2024-01-23T14:15:00"
            },
            {
                sender: "artistic-friend",
                content: "Oh, I've been meaning to see that! Count me in. What time should we meet?",
                timestamp: "2024-01-23T14:20:00"
            },
            {
                sender: "user",
                content: "Great! Let's meet at the gallery entrance around 2 PM. See you there!",
                timestamp: "2024-01-23T14:45:00"
            },
            {
                sender: "artistic-friend",
                content: "Perfect! Looking forward to it.",
                timestamp: "2024-01-23T14:50:00"
            },
            {
                sender: "user",
                content: "Hey, do you have any recommendations for a good podcast series?",
                timestamp: "2024-01-24T20:00:00"
            },
            {
                sender: "podcast-enthusiast",
                content: "Absolutely! Have you tried 'The Daily' for news or 'The Joe Rogan Experience' for interesting interviews?",
                timestamp: "2024-01-24T20:05:00"
            },
            {
                sender: "user",
                content: "Thanks! I'll give them a listen. Any other favorites?",
                timestamp: "2024-01-24T20:30:00"
            },
            {
                sender: "podcast-enthusiast",
                content: "Sure, 'Radiolab' for science and storytelling, and 'How I Built This' for inspiring entrepreneurial stories!",
                timestamp: "2024-01-24T20:35:00"
            }
        ],

        attachments: [
            Image2, Image3, Image5
        ]

    },

    {
        avatar: Avatar4,
        name: "John See-nah",
        lastMessage: 'Can you see me? - Nah.',
        time: '20h',
        online: false,
        messages: [
            {
                sender: "user",
                content: "Hey! Have you tried the new coffee shop downtown?",
                timestamp: "2024-01-20T09:45:00"
            },
            {
                sender: "co-worker",
                content: "Not yet! Is it good? I might swing by during lunch.",
                timestamp: "2024-01-20T09:50:00"
            },
            {
                sender: "user",
                content: "Absolutely! The coffee is amazing, and they have a cozy atmosphere.",
                timestamp: "2024-01-20T10:15:00"
            },
            {
                sender: "co-worker",
                content: "Nice! I'll check it out. Thanks for the recommendation.",
                timestamp: "2024-01-20T10:20:00"
            },
            {
                sender: "user",
                content: "Hey, did you see the movie trailers released yesterday? Exciting stuff!",
                timestamp: "2024-01-20T14:30:00"
            },
            {
                sender: "cinephile-friend",
                content: "Oh yes! I'm hyped! Let's plan a movie night soon.",
                timestamp: "2024-01-20T14:35:00"
            },
            {
                sender: "user",
                content: "Absolutely! I'm thinking Friday. What do you think?",
                timestamp: "2024-01-20T15:00:00"
            },
            {
                sender: "cinephile-friend",
                content: "Sounds perfect! Count me in.",
                timestamp: "2024-01-20T15:05:00"
            },
            {
                sender: "user",
                content: "Hey, I'm stuck at work. Any chance you could pick up groceries on your way home?",
                timestamp: "2024-01-21T17:45:00"
            },
            {
                sender: "user",
                content: "Sure thing! Send me the list, and I'll grab everything for dinner.",
                timestamp: "2024-01-21T17:50:00"
            },
            {
                sender: "cinephile-friend",
                content: "Oh yes! I'm hyped! Let's plan a movie night soon.",
                timestamp: "2024-01-20T14:35:00"
            },
            {
                sender: "user",
                content: "Absolutely! I'm thinking Friday. What do you think?",
                timestamp: "2024-01-20T15:00:00"
            },
        ],
        attachments: [
            Image1, Image2, Image3, Image4, Image5
        ]




    },
]

const messageSlice = createSlice({
    name: "message",
    initialState: {
        username: '',
        avatar:'',
        messages: peopleList[0].messages,
        online: peopleList[0].online,
        lastMessage: peopleList[0].lastMessage,
        time: peopleList[0].time,
        attachments: peopleList[0].attachments,
        history: [],
        talkingTo: '',
        roomId: '',
        userSelected: '',
        groupSelected: ''

    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setAvatar: (state, action) => {
            state.avatar = action.payload
        },
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        setOnline: (state, action) => {
            state.online = action.payload
        },
        setAttachments: (state, action) => {
            state.attachments = action.payload
        },
        setHistory: (state, action) => {
            state.history = action.payload
        },
        setTalkingTo : (state, action) => {
            state.talkingTo = action.payload
        },
        setRoomId : (state, action) => {
            state.roomId = action.payload
        },
        setUserSelected: (state, action) => {
            state.userSelected =  action.payload
        },
        setGroupSelected: (state, action) => {
            state.groupSelected = action.payload
        }
    }
})

export const {
    setUsername,
    setAvatar,
    setMessages,
    setOnline,
    setAttachments,
    setHistory,
    setTalkingTo,
    setRoomId,
    setUserSelected,
    setGroupSelected
} = messageSlice.actions

export default messageSlice.reducer