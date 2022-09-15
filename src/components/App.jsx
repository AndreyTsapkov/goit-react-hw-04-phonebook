import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  AppContainer,
  AppTitle,
  AppMainTitle,
  AppSection,
  DesignDiv,
  Circle,
} from './App.styled';
import { Contacts } from './Contacts';
import { ContactsForm } from './ContactsForm';
import { ContactsFilter } from './ContactsFilter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contacts = window.localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      setContacts(parseContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Notify.warning(`${name} is already in contacts.`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleChangeFilter = event => {
    const { value } = event.currentTarget;

    setFilter(value);
  };

  const getNormilizeContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    const normilizeContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(filter)
    );

    return normilizeContacts;
  };

  return (
    <AppContainer>
      <AppSection>
        <AppMainTitle>Phonebook</AppMainTitle>
        <ContactsForm onSubmit={addContact}></ContactsForm>
        <DesignDiv>
          <Circle
            color="#f943fd"
            width="165px"
            height="165px"
            opacity="0.3"
            marginTop="50px"
            marginLeft="72px"
          ></Circle>
          <Circle
            color="#96e6ff"
            width="237px"
            height="237px"
            opacity="0.3"
            marginTop="231px"
            marginLeft="101px"
          ></Circle>
          <Circle
            color="#f943fd"
            width="205px"
            height="205px"
            opacity="0.2"
            marginTop="187px"
            marginLeft="390px"
          ></Circle>
        </DesignDiv>
      </AppSection>

      <AppSection>
        <AppTitle>Contacts</AppTitle>
        <ContactsFilter filter={filter} onChange={handleChangeFilter} />
        {contacts.length !== 0 ? (
          <Contacts
            contacts={getNormilizeContacts()}
            onDeleteContact={deleteContact}
          />
        ) : null}
      </AppSection>
    </AppContainer>
  );
};
