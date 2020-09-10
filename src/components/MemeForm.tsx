import * as React from 'react';
import { Dimensions } from 'react-native';
import View from './ThemedView';
import { Card, Button, TextInput } from 'react-native-paper';
import { TextInput as NativeTextInput } from 'react-native';
import { MemeEntity } from '../core/interafaces';

const { width } = Dimensions.get('window');

interface MemeFormProps {
  meme: MemeEntity;
  header: string;
  onChange?: (updated: MemeEntity) => void;
}

export class MemeFormComponent extends React.Component<MemeFormProps, Pick<MemeEntity, 'title' | 'content'>> {
  private titleRef: React.RefObject<NativeTextInput>;
  private contentRef: React.RefObject<NativeTextInput>;

  constructor(props: MemeFormProps) {
    super(props);

    this.titleRef = React.createRef();
    this.contentRef = React.createRef();

    const { title, content } = props.meme;
    this.state = {
      title,
      content,
    };
  }

  unfocus = () => {
    console.log('unfocus', this.state.title);
    this.titleRef.current?.blur();
    this.contentRef.current?.blur();
  };

  _handleEndEditing = () => {
    const { onChange } = this.props;
    const { title, content } = this.state;
    console.log('Editing end');
    onChange && onChange({ ...this.props.meme, title, content });
  };

  render() {
    const { header, meme } = this.props;
    const { title, content } = this.state;
    const setTitle = (title: string) => this.setState({ title });
    const setContent = (content: string) => this.setState({ content });

    console.log('render form', title);
    return (
      <View style={{ width, padding: 8 }}>
        <Card>
          <Card.Title title={header} />
          <Card.Cover source={{ uri: meme.uri }} />
          <Card.Content style={{ paddingTop: 10 }}>
            <TextInput
              ref={this.titleRef}
              value={title}
              onChangeText={setTitle}
              onEndEditing={this._handleEndEditing}
              style={{ paddingBottom: 10 }}
              label="Title"
              dense
              mode="outlined"
            />
            <TextInput
              ref={this.contentRef}
              value={content}
              onChangeText={setContent}
              onEndEditing={this._handleEndEditing}
              label="Content"
              multiline
              dense
              mode="outlined"
              numberOfLines={3}
            />
          </Card.Content>
          <Card.Actions>
            <Button>Auto Detect</Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}
