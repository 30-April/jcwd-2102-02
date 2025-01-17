import { Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { axiosInstance } from "../../library/api"
import AddressCard from "../Card/AddressCard"
import CartCard from "../Card/CartCard"


const OrderPage = () => {
    const [ userAddress, setUserAddress ] = useState([])
    const userSelector = useSelector((state) => state.auth)
    const [ cart, setCart ] = useState([])

    const fetchUserAddress = async() => {
        try {
            await axiosInstance.get(`/user/address/${userSelector?.id}`).then((res) => {
                const data = res.data.result
                setUserAddress([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    const fetchDataCart = async() => {
        try {
            await axiosInstance.get(`/cart/${userSelector?.id}`).then((res) => {
                const data = res.data.result
                console.log(data)
                setCart([...data])
            })
        } catch (error) {
            console.log(error)
        }
    }

    let totalPrice = 0

    const renderDataCart = () => {
        return cart.map((val) => {
            totalPrice += (val.product_price * val.quantity)
            return (
                <>
                    <CartCard
                        product_name = {val.product.product_name}
                        product_price = {val.product_price}
                        quantity = {val.quantity}
                        image_url = {val.product.product_imgs[0].img_url}
                        product_stock = {val.product.product_stocks[0].stock}
                    />
                </>
            )
        })
    }

    const renderUserAddress = () => {
        return userAddress.map((val) => {
            if(val.isDefault){
                return (
                    <>
                        <AddressCard 
                            name = {val.name}
                            province = {val.province}
                            city = {val.city}
                            phone_number = {val.phone_number}
                            address_line = {val.address_line}
                            post_code = {val.post_code}
                            is_default = {val.isDefault}
                        />
                    </>
                )
            }
        })
    }
    
    useEffect(() => {
        fetchUserAddress()
        renderUserAddress()
        fetchDataCart()
        renderDataCart()
    }, [])
    
    return (
        <HStack
            overflow='hidden'
            maxW= "90%"
            mx='auto'
            boxShadow='dark-lg'
            my={10}
            p={5}
            spacing={10}
            align='start'
        >
            
            <VStack flex={2} spacing={10} p={3}>
                <VStack w='full'>
                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={3} mb={2}>Alamat Pengirim</Text>
                    {renderUserAddress()}
                </VStack>

                <VStack w='full' align='left'>
                    <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={3} mb={2}>Ringkasan order</Text>
                    <VStack w='full' align='left' spacing={5}>
                        {renderDataCart()}
                    </VStack>
                </VStack>
            </VStack>   
            
            <VStack flex={1} p={3} borderRadius='1em' boxShadow='dark-lg' align='center'>
                <Text w='full' fontWeight='bold' borderBottom='1px solid #b41974' pb={2} mb={2}>Payment</Text>
                
                <VStack w='90%'>
                    <HStack fontSize={14} w='full' justify='space-between'>
                        <Text>Total Harga Barang</Text>
                        <Text>{Number(totalPrice).toLocaleString('id', { style: 'currency', currency: 'IDR' })}</Text>
                    </HStack>

                    <HStack fontSize={14} w='full'>
                        <Text flex={1}>Total Harga Pengiriman</Text>
                        <Text flex={1}></Text>
                    </HStack>
                </VStack>

                <HStack fontSize={16} justify='center' fontWeight='bold'  w='full' borderTop='1px solid #b41974' pt={1}>
                    <Flex justify='space-between' w='90%'>
                        <Text>Total Payment</Text>
                        <Text>Rp.500.000,00</Text>
                    </Flex>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default OrderPage