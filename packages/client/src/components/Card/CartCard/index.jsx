import { DeleteIcon } from "@chakra-ui/icons"
import { Box, Button, HStack, Icon, Input, Stack, Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import { useState } from "react"
import { HiMinus, HiPlus } from "react-icons/hi"


const CartCard = (props) => {
    const { product_name, product_price, product_category, quantity, image_url, product_stock } = props
    const [ counter, setCounter ] = useState(quantity)
    return (
        <HStack boxShadow="dark-lg" p={3} borderRadius='1em'>
            <Image
                src={`http://${image_url}`}
                alt=""
                width={150}
                height={150}
            />
            <VStack w='full' h='full'>
                <HStack  w='full' justify='space-between'>
                    <Text fontWeight='bold' fontSize={18}>{product_name}</Text>
                    
                    <HStack color ='red' fontSize={13}>
                        <Text>delete</Text>
                        <DeleteIcon 
                        cursor='pointer' 
                        _hover={{color: "red"}}
                        />
                    </HStack>
                </HStack>
                <VStack w='full' h='full'>
                    <HStack w='full' align='start' borderBottom='1px solid black' paddingBottom={2}>
                        <Text>{Number(product_price).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        <Text px={1} fontWeight='bold'>X</Text>
                        <HStack>
                            <Button onClick={() => {setCounter(counter - 1)}} size='xs'>
                                <Icon as={HiMinus}/>
                            </Button>
                            
                            <Input value={counter} type='number'w={30} mx='auto' size='xs' justifySelf='center'/>
                            
                            <Button onClick={() => {setCounter(counter + 1)}} size='xs'>
                                <Icon as={HiPlus}/>
                            </Button>
                            <Text fontSize={11}>/ Stock {product_stock}</Text>
                        </HStack>
                    </HStack>
                        <HStack w='full' justify='space-between' h='full'>
                            <Text fontWeight='bold'> Harga Total</Text>
                            <Text fontWeight='bold'>{Number(product_price * quantity).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                        </HStack>
                </VStack>
            </VStack>
        </HStack>
    )
}

export default CartCard