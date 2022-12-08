import React from 'react';

const DataContext = React.createContext()

function DataProvider(props){

    const [data, setData] = React.useState([])

    return <DataContext.Provider value={[data, setData]} {...props} />
}

function useData(){
    const context = React.useContext(DataContext)

    if(!context){
        throw new Error('cant find the provider')
    }
    return context
}

export {DataProvider, useData}