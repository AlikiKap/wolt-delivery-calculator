import { FormEvent, useState } from "react"
import { DeliveryForm } from './Components/DeliveryForm';
import  './styles/App.scss';



type deliveryData ={
  cartValue:string
  deliveryDistance:string
  itemsAmount:string
  time:string

}

const INITIAL_DATA: deliveryData = {
  cartValue:"",
  deliveryDistance:"",
  itemsAmount:"",
  time:"",
}

function App() {
  const [data,setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<deliveryData>){
    setData(prev => {
      return{...prev, ...fields}
    })
  }

  return (
    <>
    <style>{`
    body {
      margin: 0px;
      padding: 0px;
    }
  `}</style>
    <DeliveryForm {...data}  updateFields={updateFields}/>
    </>
  );
}

export default App;
