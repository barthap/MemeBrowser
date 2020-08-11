import React, { useState } from 'react';
import { Header, Item, Input, Icon } from 'native-base';

interface SearchBarProps {
  onTextChanged: (text: string) => void;
  onFinished?: () => void;
}
export default function SearchBar(props: SearchBarProps) {
  const [text, setText] = useState('');

  const handleChange = (val: string) => {
    setText(val);
    props.onTextChanged(val);
  };

  return (
    <Header searchBar rounded style={{ paddingTop: 0, height: 45 }}>
      <Item>
        <Icon name="ios-search" />
        <Input
          placeholder="Search"
          onChangeText={handleChange}
          value={text}
          returnKeyLabel="Search"
          onEndEditing={props.onFinished}
        />
      </Item>
    </Header>
  );
}
