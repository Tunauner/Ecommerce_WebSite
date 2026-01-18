import React from 'react'
import CreateProductForm from '../components/CreateProductForm'
import { useState } from 'react'
import { PlusCircle, ShoppingBasket, BarChart } from "lucide-react";
import GetProducts from '../components/ProducstsList'
import AnalyticComponent from '../components/AnalyticComponent'


const AdminPage = () => {

    


const tabs =[
    {id:"create" ,label:"Create Product" ,icon: PlusCircle},
    {id:"products" ,label:"Products",icon: ShoppingBasket},
    {id:"analytics" ,label:"Analytics",icon: BarChart},
]  
const [activeTab, setActiveTab] = useState( "create");

    return (
    <>
        {/* maın contaniner */}
        <div className='container mx-auto text-center max-w-3xl px-12'>
            {/* header  and buttons*/}
            <h1 className='text-2xl md:text-4xl font-bold text-gray-800 mb-24'>Admin Dashboard</h1>
            
       
        <div className='flex justify-center gap-4 mb-6 items-center'>
              {tabs.map((tab) => (
            <button key={tab.id}  onClick={() => setActiveTab(tab.id)} 
            className={`px-4 py-2 rounded-lg ${activeTab === tab.id ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`} 
            >
                <tab.icon className='w-6 h-6 inline-block mr-2'/>
                {tab.label}
            </button>
        ))}
        </div>

       
      
{}
        {activeTab === "create" && <CreateProductForm/>}
        {activeTab === "products" && <GetProducts/>}
        {activeTab === "analytics" && <AnalyticComponent />}

        </div>
    </>
)
}

export default AdminPage