import { PropsWithChildren } from 'react';
import { View ,StatusBar, useColorScheme, KeyboardAvoidingView, Platform} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function AppTemplate(props:PropsWithChildren) {
    const insets=useSafeAreaInsets();
    const isDarkMode = useColorScheme() === 'dark';

    return <View style ={{
       paddingTop: insets.top,
       paddingBottom: insets.bottom,
       paddingLeft: insets.left,
       paddingRight: insets.right,
       flex: 1
    }}>
        <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
>

      <StatusBar barStyle={isDarkMode ?
                        'light-content' :
                        'dark-content'} />

        {props.children}
        </KeyboardAvoidingView>
        </View>
}
export default AppTemplate;