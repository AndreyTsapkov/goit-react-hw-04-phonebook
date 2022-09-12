import { Component } from 'react';
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

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);

    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

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

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleChangeFilter = event => {
    const { value } = event.currentTarget;

    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;

    const normalizeFilter = filter.toLowerCase();

    const normilizeContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(filter)
    );

    return (
      <AppContainer>
        <AppSection>
          <AppMainTitle>Phonebook</AppMainTitle>
          <ContactsForm onSubmit={this.addContact}></ContactsForm>
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
          <ContactsFilter filter={filter} onChange={this.handleChangeFilter} />
          {contacts.length !== 0 ? (
            <Contacts
              contacts={normilizeContacts}
              onDeleteContact={this.deleteContact}
            />
          ) : null}
        </AppSection>
      </AppContainer>
    );
  }
}
