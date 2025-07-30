import { Pressable, TextInput } from "react-native";
import { View, Text } from "../Themed";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { commonStyles } from "@/styles/commonStyles";
import { useCallback, useEffect, useState } from "react";

const MIN_PLAYER_NAME_LENGTH = 2;

export function AddPlayerForm() {
    const { control } = useFormContext();
    const [newPlayer, setNewPlayer] = useState('');
    const [playerValidationError, setPlayerValidationError] = useState<string | null>(null)

    const showAddPlayerButton = !Boolean(playerValidationError);
    const showValidationError = Boolean(playerValidationError);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'players',
    });

    const onAddPlayer = useCallback(() => {
        if (newPlayer.length > MIN_PLAYER_NAME_LENGTH) {
            append(newPlayer);
            setNewPlayer('');
        }
    }, [newPlayer.length]);

    useEffect(() => {
        if (newPlayer.length > MIN_PLAYER_NAME_LENGTH) {
            setPlayerValidationError(null)
        } else {
            setPlayerValidationError('Player musí mít alespoň 2 znaky')
        }   
    }, [newPlayer])

    return (
        <>
            <Text style={{fontWeight: 'bold'}}>Hráči</Text>
            {
                fields.map((field, index) => (
                    <View key={field.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4  }}>
                        <Controller
                            control={control}
                            name={`players.${index}`}
                            render={({ field }) => (
                            <TextInput
                                style={commonStyles.input}
                                placeholder={'Jméno hráče'}
                                {...field}
                            />
                            )}
                        />
                        <Pressable onPress={() => remove(index)}>
                            <Text style={{ color: 'red', padding: 5 }}>Odebrat</Text>
                        </Pressable>
                    </View>
                ))
            }

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={commonStyles.input}
                    value={newPlayer}
                    onChangeText={setNewPlayer}
                    placeholder="Nový hráč"
                />
                {
                    showAddPlayerButton && (
                        <Pressable onPress={onAddPlayer}>
                            <Text style={{ color: 'green', padding: 5 }}>Přidat</Text>
                        </Pressable>    
                    )
                }
                
                {
                    showValidationError && <Text style={{color: "red"}}>{playerValidationError}</Text>
                }
            </View>
      </>
    )
}