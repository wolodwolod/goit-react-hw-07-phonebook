
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { getAllContacts, getContactsLoading } from 'redux/contacts/contacts-selectors';
// import actions from 'redux/contacts/contacts-actions';
import operations from 'redux/contacts/contacts-operations';

// import { initialState } from "./redux/contacts/contacts-reduser";



function App () {
   
  const [filter, setFilter] = useState('');  
  
  const contacts = useSelector(getAllContacts, shallowEqual);
  const loading = useSelector(getContactsLoading, shallowEqual);
  const dispatch = useDispatch();
  console.log(contacts);
  // console.log(initialState);
  
  
  // const setContacts = useCallback((payload) => {
  //   console.log(payload);
  //   const action = operations.set(payload);
  //   dispatch(action);
  // }, [dispatch]);  

  const firstRenderRef = useRef(true);

    
  useEffect(() => {
        if(firstRenderRef.current) {
            // console.log("first  render")
          // setContacts(initialState);
          const getContacts = () => dispatch(operations.fetch());
          getContacts();
        //     const parsedСontacts = JSON.parse(data);            
        //   if (parsedСontacts?.length) {
        //     console.log(parsedСontacts);
        //       setContacts (parsedСontacts)            
        //   };
        //     firstRenderRef.current = false;
        // }
        // else {
        //     // console.log("second  render")
        //     localStorage.setItem("contacts", [JSON.stringify(contacts)]);
        }    
    }, [dispatch]);  
  
  
  const addContact = (payload) => {
    
    const { name, number } = payload;
    
    const normalizedInputName = name.toLowerCase();
    const findName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedInputName
    );
    if (findName) {
      return alert(`${name} is already in contacts!`);
    }
    const findNumber = contacts.find(
      contact => contact.number === number);
    if (findNumber) {
      return alert(`This phone number is already in contacts!`);
    }
    
    const action = operations.add(payload);
    dispatch(action);
  }; 
  
  
  const deleteContact = (id) => {
    const action = operations.remove(id);
    dispatch(action);
  };  


  const filterContacts = () => {
    
    const normalizedFilter = filter.toLowerCase();
    
      return filter !== "" ? contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)) : contacts
    ;
  };

  const handleFilter = useCallback ( (e) => {
    setFilter(e.currentTarget.value);
    }, []);

  console.log(filterContacts());
       
  return (
    <>
      <Section className='PhonebookSection' title='Phonebook'>        
        <ContactForm onSubmit={addContact}/>       
      </Section>
      
      <Section className='ContactsSection' title='Contacts'>
        <Filter value={filter} onChange={handleFilter} />
        {loading && <p>...Loading</p>}
        <ContactList contacts={filterContacts ()} onDelete={deleteContact} />        
      </Section>
    </>
  );
}

export default App;