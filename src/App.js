import { 
  
  Container, 
  SimpleGrid,
  Badge,
  List, 
  ThemeIcon,
  Input,
  Button,
  Group,
  Drawer,
  Indicator 
} from '@mantine/core';
import { IconCircleCheck, IconBasket } from '@tabler/icons';
import { IconSettings } from '@tabler/icons';
import { useState } from 'react';
import Card from './components/Card';
import './App.css';

const storeItems =  [{
  id : 100,
  name : "Fotoğraf Makinası",
  src: "kamera",
  price : 20
},
{
  id : 101,
  name : "Kulaklık",
  src: "kulaklık",
  price : 10
},
{
  id : 102,
  name : "Kol",
  src: "kol",
  price : 25
},
{
  id : 103,
  name : "Araba",
  src: "araba",
  price : 25
},
{
  id : 104,
  name : "Gözlük",
  src: "göözlük",
  price : 25
},
{
  id : 105,
  name : "Saat",
  src: "saat (2)",
  price : 25
},
];

function App() {
  let [opened, setOpened] = useState(false);
  let [basketItems, setbasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState("");
  let filteredItems = storeItems.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);

 let addToBasket = ({ id , name }) =>  {
   let basketIndex =  basketItems.findIndex((item) => item.id === id);
   if (basketIndex >= 0) { 
     let _basketItems = [...basketItems]; 
     _basketItems[basketIndex].count+=1;
     setbasketItems(_basketItems);  
   } else {
     setbasketItems([...basketItems, {  id, name , count:1  }]);
   }
 };
  
 
  return (
    <Container>
      <Group align="end">
       <Input.Wrapper label="Arama">
       <Input value={searchValue}  onChange={(e) => setSearchValue(e.target.value)} />
       </Input.Wrapper> 
       <Button onClick={() => setSearchValue("")}>Temizle</Button>
       <Indicator  color="red" label={basketItems.length} size={22}>
        <Button onClick={() => setOpened(true)}><IconBasket size={20} /></Button >  
       </Indicator>
    </Group>
    
    <SimpleGrid cols={3} className="Store">
      {filteredItems.map(({ id,name , src}) => {
        return ( <Card 
          key={name} 
          name={name} 
          src={src}
          onAdd={() => addToBasket({id, name})} 
          />
        );
      })}
     
     </SimpleGrid >
      
    <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Sepet"
        padding="md"
        size="md"
      >
        {/* Drawer content */}
      
        { <List
     className="List"
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size={16} />
        </ThemeIcon>
      }
    >
      {basketItems.map(({name , count} , index) => ( 
      <List.Item key={index}>
        <Group cols={4}>
       <div> {name}</div>    <Badge>{count}</Badge>
        </Group> 
        </List.Item>
      ))}

    </List> }
   
       </Drawer>
    </Container>
  );
}

export default App;
