import { 
  Container, 
  SimpleGrid,
  List, 
  ThemeIcon,
  Input,
  Button,
  Group,
  Drawer,
  Indicator 
} from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
import { useState } from 'react';
import Card from './components/Card';
import './App.css';

const storeItems =  [{
  name : "Fotoğraf Makinası",
  src: "kamera",
  price : 20
},
{
  name : "Kulaklık",
  src: "kulaklık",
  price : 10
},
{
  name : "Kol",
  src: "kol",
  price : 25
},
{
  name : "Araba",
  src: "araba",
  price : 25
},
{
  name : "Gözlük",
  src: "göözlük",
  price : 25
},
{
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
 
  return (
    <Container>
      <Group align="end">
       <Input.Wrapper label="Arama">
       <Input value={searchValue}  onChange={(e) => setSearchValue(e.target.value)} />
       </Input.Wrapper> 
       <Button onClick={() => setSearchValue("")}>Temizle</Button>
       <Indicator  color="red" label={basketItems.length} size={22}>
        <Button onClick={() => setOpened(true)}>Sepet</Button>  
       </Indicator>
    </Group>
    
    <SimpleGrid cols={3} className="Store">
      {filteredItems.map(({name , src}) => {
        return ( <Card 
          key={name} 
          name={name} 
          src={src}
          onAdd={() => setbasketItems([...basketItems, { name }])}
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
      {basketItems.map(({name} , index) => ( 
      <List.Item key={index}>{name}</List.Item>
      ))}

    </List> }
   
       </Drawer>
    </Container>
  );
}

export default App;
