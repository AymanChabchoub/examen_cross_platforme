import { PropsWithChildren } from 'react';
import { ScrollView, View} from 'react-native';

function ScreenTemplate(props:PropsWithChildren) {
    return <View style={{flex: 1}}
               >
        <ScrollView
        style ={{flex: 1}}
        contentContainerStyle={{flex: 1}}
        >

        {props.children}
        </ScrollView>
        </View>
}
export default ScreenTemplate;