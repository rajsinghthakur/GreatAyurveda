import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { AiOutlineArrowLeft } from 'react-icons/ai'

const PaymentSuccess = () => {

    const searchQuery = useSearchParams()[0]
    const navigate = useNavigate();

    const referenceNum = searchQuery.get("reference")
    return (
        <Box>
            <VStack h="100vh" justifyContent={"center"}>
                <Heading textTransform={"uppercase"}> Order Successfull</Heading>
                <Text>
                    Reference No.{referenceNum}
                    {
                        console.log(referenceNum)
                    }
                    <button onClick={()=>navigate("/")} 
                    className='btn btn-outline-success'><AiOutlineArrowLeft className="fs-5 me-2" />Back to shop</button>
                </Text>
                    
            </VStack>
        </Box>
    )
}

export default PaymentSuccess;