import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Flex, Text, Tooltip, VStack } from "@chakra-ui/react"


const AddressCard = (props) => {
    const { name, phone_number, address_line, province, city, post_code, is_default } = props
    return (
        <Box p={3} boxShadow='dark-lg' borderRadius={5} minW='full'>
            <Flex justifyContent='space-between' mb={3}>
                {
                    is_default ? 
                    <Text 
                        fontSize={14} 
                        border='1px' 
                        p={1} 
                        borderRadius={3} 
                        borderColor='#b41974' 
                        color='#b41974'
                    >
                        Default
                    </Text>

                    : null
                }
                
                <Flex align='center'>
                    <Tooltip label='edit ypur address'>
                        <EditIcon mr={3} cursor='pointer' _hover={{color: "green"}}/>
                    </Tooltip>
                    <DeleteIcon mr={3} cursor='pointer' _hover={{color: "red"}}/> 
                </Flex>
            </Flex>

            <VStack minW='full'>
                <Box minW='full'>
                    <Flex align='center' justify='left'>
                        <Text fontSize={14} fontWeight='bold' mr={2} pr={1} borderRight='1px' borderColor="black">{name}</Text>
                        <Text fontSize={14} mr={2} color='#b41974'>{phone_number}</Text>
                    </Flex>
                    <Text fontSize={14} color="grey">{address_line}, {province}, {city}, {post_code}</Text>
                </Box>
            </VStack>
        </Box>
    )
}

export default AddressCard