import { View, Text, StatusBar, ScrollView, TouchableOpacity ,Image} from 'react-native'
import React, { useEffect } from 'react'
import  {COLOURS, Items} from '../database/Database'
import { Entypo } from '@expo/vector-icons'; 
import { AntDesign,FontAwesome } from '@expo/vector-icons'; 
const Home = ({navigation}) => {
    const [products,setProducts] = React.useState([]);
    const [accessory,setAccessory] = React.useState([]);
    //useEffect có thể hiểu là nó sẽ gọi khỏi tạo, sau khi khởi tạo,và sau khi chạy xong
    //bộ từ 11-16 tức là nó sẽ tập chung chạy hàm getDataFromDB() sau đó mới chạy tiếp thường dùng trong useEffect
    React.useEffect(()=>{
        const unsubcribe= navigation.addListener('focus',()=>{
            getDataFromDB();
        })
        return unsubcribe;
    },[navigation])
    //lấy dữ liệu trong Items ra 
    const getDataFromDB=()=>{
        let productList=[];
        let accessoryList=[];
        for (let index=0;index<Items.length;index++)
        {
            if (Items[index].category==="product")
            {
                productList.push(Items[index])
            }
            else
                accessoryList.push(Items[index]);
        }
        setProducts(productList);
        setAccessory(accessoryList);
    }
    const ProductCard=({data})=>{
        return(
            <TouchableOpacity
                style={{
                    width:'48%',
                    marginVertical:14,
                }}
                onPress={()=>navigation.navigate("Product",{productID: data.id})}
            >
                <View style={{
                    width:'100%',
                    height:100,
                    borderRadius:10,
                    backgroundColor:COLOURS.backgroundLight,
                    position:'relative',
                    justifyContent:'center',
                    alignItems:'center',
                    marginBottom:8,
                }}>
                    {
                        data.isOff===true ? (<View
                            style={{
                                position:'absolute',
                                width:'20%',
                                height:'24%',
                                backgroundColor:COLOURS.green,
                                top:0,
                                left:0,
                                borderTopLeftRadius:10,
                                borderBottomRightRadius:10,
                                alignItems:'center',
                                justifyContent:'center',
                            }}    
                        ><Text
                            style={{
                                fontSize:12,
                                color:COLOURS.white,
                                fontWeight:'bold',
                                letterSpacing:1,
                            }}
                        >{data.offPercentage}</Text></View>):null
                    }
                    <Image source={data.productImage}
                        
                        style={{
                            width:'80%',
                            height:'80%',
                            resizeMode:'contain',
                        }}
                    />
                </View>
                <Text style={{
                    fontSize:12,
                    color: COLOURS.black,
                    fontWeight:'600',
                    marginBottom:2,
                }}>{data.productName}</Text>
                {
                    data.category=="accessory"?data.isAvailable?(
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <FontAwesome name='circle'
                                style={{
                                    fontSize:12,
                                    marginRight:6,
                                    color:COLOURS.green,
                                }}
                            />
                            <Text style={{
                                fontSize:12,
                                color:COLOURS.green,
                            }}>Anailable</Text>
                        </View>
                    ):(
                        <View
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}
                    >
                        <FontAwesome name='circle'
                            style={{
                                fontSize:12,
                                marginRight:6,
                                color:COLOURS.red,
                            }}
                        />
                        <Text style={{
                            fontSize:12,
                            color:COLOURS.red,
                        }}>Unailable</Text>
                    </View>
                    ):null
                }
                <Text>&#8377; {data.productPrice}</Text>
            </TouchableOpacity>
        )
    }
  return (
    <View style={{
        width:'100%',
        height:'100%',
        backgroundColor: COLOURS.white,
    }}>
    <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content"/>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
            width:'100%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between',
            padding:16,
            
        }}>
            <TouchableOpacity>
                <Entypo 
                    name="shopping-bag" 
                    style={{
                        fontSize:18,
                        color:COLOURS.backgroundMedium,
                        padding:12,
                        borderRadius:30,
                        backgroundColor:COLOURS.backgroundLight,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('MyCart')}>
                <AntDesign 
                    name="shoppingcart"
                    style={{
                        fontSize:18,
                        color:COLOURS.backgroundMedium,
                        padding:12,
                        borderRadius:30,
                        backgroundColor:COLOURS.backgroundLight,
                        borderWidth:1,
                        borderColor:COLOURS.backgroundLight,
                    }}
                />                
            </TouchableOpacity>
        </View>
        <View style={{
            marginBottom:10,
            padding:16,
        }}>
            <Text
                style={{
                    fontSize:24,
                    color:COLOURS.black,
                    fontWeight:'500',
                    letterSpacing:1,
                    marginBottom:10,
                }}
            >Hi-Fi Shop &amp; Sevice</Text>
             <Text
                style={{
                    fontSize:14,
                    color:COLOURS.black,
                    fontWeight:'500',
                    letterSpacing:1,
                    marginBottom:10,
                    lineHeight:24,
                }}
            >Audio shop on Rustaveli Ave 57.{'\n'}This shop offers both products and services</Text>
        </View>
        <View 
            style={{
                padding:16,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
            <View style={{
                    flexDirection:'row',
                    alignItems:'center',
            }}>
                <Text style={{fontSize:18,color:COLOURS.black,fontWeight:'500',letterSpacing:1}}>Products</Text>
                <Text style={{fontSize:14,color:COLOURS.black,fontWeight:'500',opacity:0.5,marginLeft:10}}>41</Text>
            </View>
            <Text style={{
                fontSize:14,
                color:COLOURS.blue,
                fontWeight:'400',
            }}>
            SeeAll
            </Text>
        </View>
        <View style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-around',
        }}>
            {
                products.map((data)=>{
                    return <ProductCard data={data} key={data.id}/>
                })
            }
        </View>
        <View 
            style={{
                padding:16,
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
            <View style={{
                    flexDirection:'row',
                    alignItems:'center',
            }}>
                <Text style={{fontSize:18,color:COLOURS.black,fontWeight:'500',letterSpacing:1}}>Accessory</Text>
                <Text style={{fontSize:14,color:COLOURS.black,fontWeight:'500',opacity:0.5,marginLeft:10}}>41</Text>
            </View>
            <Text style={{
                fontSize:14,
                color:COLOURS.blue,
                fontWeight:'400',
            }}>
            SeeAll
            </Text>
        </View>
        <View style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-around',
        }}>
            {
                accessory.map((data)=>{
                    return <ProductCard data={data} key={data.id}/>
                })
            }
        </View>
    </ScrollView>
    </View>
  )
}

export default Home