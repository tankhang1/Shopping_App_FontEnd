import { View, Text,Image,Modal, TouchableOpacity, RefreshControl, Dimensions, ScrollView } from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS, Items } from '../database/Database';
import { AntDesign } from '@expo/vector-icons'; 
import { Fontisto } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 
const MyCart = ({navigation}) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);
  //get data from local DB by ID
  const getDataFromDB = async () => {
    let items = await AsyncStorage.getItem('cartItems');
    items = JSON.parse(items);
    let productData = [];
    if (items) {
      Items.forEach(data => {
        if (items.includes(data.id)) {
          productData.push(data);
          return;
        }
      });
      setProduct(productData);
      getTotal();
    } else {
      setProduct(false);
      getTotal();
    }
  };
  var quality= new Array(10);
  for (let index = 0; index < quality.length; index++)
  {
    quality[index]=0;
  }
  product?product.map((item,index)=>{quality[item.id]=1}):null;
  //get total price of all items in the cart
  const getTotal = () => {
    //console.log(product);
    let tmp=0;
    for (let index = 0; index < product.length; index++) {
      tmp=tmp+ product[index].productPrice*quality[product[index].id];
    }
    setTotal(tmp);
    //console.log(total);
  };
  const getTotal1 = () => {
    //console.log(product);
    let tmp=0;
    for (let index = 0; index < product.length; index++) {
      tmp=tmp+ product[index].productPrice*quality[product[index].id];
    }
    setTotal(tmp);
    //console.log(total);
    setModalVisible(!modalVisible);
  };
  const removeItemFromCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      for (let index = 0; index < array.length; index++) {
        if (array[index] == id) {
          array.splice(index, 1);
        }

        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    }
  };
  //   let itemArray=[...product];
  //  // itemArray.splice(1,1);
  //   console.log(itemArray.length);
  //   let lc=-1;
  //   for (let index = 0; index < itemArray.length; index++) { 
  //     if (itemArray[index].id===id)
  //     {
  //       itemArray.splice(index,1);
  //       console.log(itemArray.length)
  //       setProduct(itemArray);
  //     }
  //     AsyncStorage.setItem('carItems',JSON.stringify(itemArray));
  //     getDataFromDB();
  //   }
  //   }
   // setProduct(itemArray);
    //itemArray=JSON.parse(itemArray);
    //if (itemArray)
    // AsyncStorage.setItem('carItems',JSON.stringify(itemArray));
    // getDataFromDB();}
    // itemArray.splice(lc,1);
    // console.log(itemArray.length);
  
  
  const handleMinus=(cart_id)=>{
    setProduct(product=>
      product.map((item)=>
        cart_id===item.id?{...item,number:item.number-1}:item

    ));
  }
  const handlePlus=(cart_id)=>{
    setProduct(product=>
      product.map((item)=>
        cart_id===item.id?{...item,number:item.number+1}:item
      
    ));
  }
  const renderProducts=(data,index)=>{
    quality[data.id]=data.number;
    return(
      <View 
        key={index}    
      style={{
        width:'100%',
        height:150,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        padding:10,
        marginVertical:1,
      }}>
        <View style={{
          width:'30%',
          height:'100%',
          backgroundColor:COLOURS.backgroundLight,
          borderRadius:30,
          alignItems:'center',
          justifyContent:'center',
          paddingHorizontal:10,
        }}>
        <Image source={data.productImage}
          style={{
            width:'100%',
            height:'100%',
            resizeMode:'contain',
          }}
        />
        </View>
        <View style={{
          width:'80%',
          height:'100%',
          justifyContent:'flex-start',
          alignItems:'flex-start',
          marginLeft:20,
        }}>
          <Text style={{
            fontSize:15,
            fontWeight:'bold',
            marginBottom:10,
            maxWidth:'80%',
          }}>{data.productName}</Text>
          <Text style={{
            fontSize:15,
            opacity:0.5,
          }}>&#36;{data.productPrice} (-&#36;{data.productPrice/20} Tax)</Text>
          <View 
          style={{
            position:'absolute',
            bottom:0,
            flexDirection:'row',
            marginHorizontal:1
          }}>
          <TouchableOpacity onPress={()=>handleMinus(data.id)}>
            <View style={{
              borderWidth:0.1,
              borderRadius:20,
              width:40,
              height:30,
              justifyContent:'center',
              alignItems:'center',
              opacity:0.5,
            }}>
              <AntDesign name="minus" size={24} color="black" />
            </View>
          </TouchableOpacity> 
          <View style={{
            width:40,
            height:30,
            alignItems:'center',
            justifyContent:'center',
            opacity:0.5,
          }}>
            <Text style={{
              fontSize:15,
              
            }}>{data.number}</Text>
          </View>
          <TouchableOpacity onPress={()=>handlePlus(data.id)}>
            <View style={{
              borderWidth:0.1,
              borderRadius:20,
              width:40,
              height:30,
              justifyContent:'center',
              alignItems:'center',
              opacity:0.5,
            }}>
              <AntDesign name="plus" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>removeItemFromCart(data.id)}>
          <View style={{
              borderWidth:0.1,
              borderRadius:20,
              width:40,
              height:30,
              justifyContent:'center',
              alignItems:'center',
              opacity:0.5,
              marginLeft:50,
              borderWidth:1,
            }}>
          <AntDesign name="delete" size={24} color="black" />
          </View>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  const [modalVisible,setModalVisible]= React.useState(false);

  return (
    <View style={{
        width:'100%',
        height:Dimensions.get("window").height,
        backgroundColor:COLOURS.white,
        padding:4,
      }}> 
      <View
        style={{
          width:'100%',
          flexDirection:'row',
          alignItems:'center',
          padding:5,
        }}
      >
      <TouchableOpacity style={{width:'100%'}} onPress={()=>navigation.goBack()}>
      <View style={{
        width:'14%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        backgroundColor:COLOURS.backgroundLight,
      }}>
        <AntDesign name="left" size={24} color={COLOURS.backgroundDark} />
      </View>
      </TouchableOpacity>
      <View style={{
        width:'50%',
        position:'absolute',
        left:'25%',
        right:'25%',
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:COLOURS.backgroundLight,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:20,
      }}>
        <Text style={{
            fontSize:18,
            fontWeight:'500',
        }}>Order Details</Text>
      </View>
      </View>
      <ScrollView>
        <Text style={{
            fontSize:20,
            marginTop:10,
            fontWeight:'bold',
        }}>My Cart</Text>

        {
          product?(product.map((data,index)=>renderProducts(data,index))):null
        }
      <Text style={{
          fontSize:20,
          marginTop:10,
          fontWeight:'bold',
      }}>Delivery Location</Text>
      <View style={{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
      }}>
        <View style={{
          width:'80%',
          flexDirection:'row',
          marginVertical:10,
          }}>
          <View style={{
            width:50,
            height:40,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:COLOURS.backgroundLight,
            borderRadius:10,
          }}>
            <Octicons name="location" size={24} color={COLOURS.blue} />
          </View>
          <View style={{ flexDirection:'column',  marginLeft:10}}>
            <Text style={{
                fontSize:14,
                fontWeight:'700',
            
            }}>2 Petre Melikishvili St.</Text>
            <Text style={{fontSize:14,opacity:0.5}}>0162, Tbilisi</Text>
          </View>
        </View>
          <View style={{
            width:50,
            height:40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20,
            backgroundColor:COLOURS.backgroundLight,
          }}>
            <AntDesign name="right" size={24} color={COLOURS.backgroundDark} />
          </View>
          </View>
          <Text style={{
          fontSize:20,
          marginTop:10,
          fontWeight:'bold',
      }}>Payment Method</Text>
      <View style={{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
      }}>
        <View style={{
          width:'80%',
          flexDirection:'row',
          marginVertical:10,
          }}>
          <View style={{
            width:50,
            height:40,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:COLOURS.backgroundLight,
            borderRadius:10,
          }}>
            <Fontisto name="visa" size={24} color={COLOURS.blue} />
          </View>
          <View style={{ flexDirection:'column',  marginLeft:10}}>
            <Text style={{
                fontSize:14,
                fontWeight:'700',
            
            }}>VISA Classic</Text>
            <Text style={{fontSize:14,opacity:0.5}}>****-0921</Text>
          </View>
        </View>
          <View style={{
            width:50,
            height:40,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:20,
            backgroundColor:COLOURS.backgroundLight,
          }}>
            <AntDesign name="right" size={24} color={COLOURS.backgroundDark} />
          </View>
          </View>
          <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{setModalVisible(!modalVisible)}}
        >
          <View style={{
            width:'100%',
            borderWidth:0.2,
            backgroundColor:COLOURS.white,
            position:'absolute',
            bottom:0,
            borderTopLeftRadius:20,
            borderTopRightRadius:20,
            padding:10,
          }}>
            <Text style={{
              fontSize:18,
              fontWeight:'600',
              letterSpacing:0.5,
              marginVertical:10,
            }}>Order Info</Text>
            <View style={{
              borderBottomWidth:0.5,
              flexDirection:'row',
              justifyContent:'space-between',
            }}>
            <Text style={{
              opacity:0.5,
            }}>Subtotal</Text>
            <Text>${total}</Text>
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
            }}>
            <Text style={{
              opacity:0.5,
            }}>Shipping Cost</Text>
            <Text>+${(total*1)/100}</Text>
            </View>
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              marginVertical:10,
            }}>
            <Text style={{
              opacity:0.5,
            }}>Subtotal</Text>
            <Text>${total+(total*1)/100}</Text>
            </View>
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <View style={{
                width:'80%',
                backgroundColor:COLOURS.blue,
                justifyContent:'center',
                alignItems:'center',
                padding:10,
                position:'relative',
                bottom:0,
                alignSelf:'center',
                borderRadius:30,
                paddingVertical:10,
              }}>
              <Text style={{
                color:COLOURS.white,
                fontSize:16,
              }}>Confirm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity onPress={getTotal1}>
          <View
            style={{
              width:'80%',
              height:50,
              marginVertical:20,
              alignSelf:'center',
              borderRadius:20,
              backgroundColor:COLOURS.blue,
              alignItems:'center',
              justifyContent:'center',
            }}
          >
            <Text style={{
              color:COLOURS.white,
              fontWeight:'700',
              letterSpacing:1,
            }}>CHECKOUT</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default MyCart
