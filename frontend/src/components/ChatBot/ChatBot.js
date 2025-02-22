import React, { useState } from "react";
import { Segment } from 'semantic-ui-react';
import { AiOutlineClose } from "react-icons/ai";
import ChatBot from "react-simple-chatbot";
import "./ChatBot.css"; // Import your CSS file for ChatBot styling
import { IoMdClose } from "react-icons/io";

const CustomChatBot = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const steps = [
        {
            id: "Greet",
            message: "Hello",
            trigger: "Done",
        },
        {
            id: "Done",
            message: "Please enter your name!",
            trigger: "waiting1",
        },
        {
            id: "waiting1",
            user: true,
            trigger: "Name",
        },
        {
            id: "Name",
            message: "Hi {previousValue}, Please tell the symptoms that you are experiencing",
            trigger: "issues",
        },
        {
            id: "issues",
            options: [
                {
                    value: "Yes",
                    label: "Yes",
                    trigger: "Yes",
                },
                { value: "No", label: "No", trigger: "No" },
            ],
        },
        {
            id: "Yes",
            message: "Thanks for letting your React issue, Our team will resolve your issue ASAP",
            end: true,
        },
        {
            id: "No",
            message: "Thanks for letting your Angular issue, Our team will resolve your issue ASAP",
            end: true,
        },
    ];

    return (
        <>
            {isOpen && (
                <div className="chatbot-container ">
                    <Segment>
                        <style>
                            {`
                                .rsc-ts-bubble {
                                    background-color:var(--green);
                                    color: white;
                                }

                                .rsc-header {
                                    background-color: var(--green);
                                }
                            `}
                        </style>
                        <ChatBot steps={steps} />
                    </Segment>
                    <IoMdClose size={30} className="close-icon" onClick={handleClose} />
                </div>
            )}
        </>
    );
};

export default CustomChatBot;
