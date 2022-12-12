import React, { useState } from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import RadioGroup from "react-native-radio-buttons-group";

function GenderSelector({ show, onClose, onGenderSelected }) {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Male",
      value: "option1",
      selected: true,
    },
    {
      id: "2",
      label: "Female",
      value: "option2",
      selected: false,
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    const selectedGender = radioButtonsArray.find(
      (item) => item.selected === true
    );
    onGenderSelected(selectedGender);
    setRadioButtons(radioButtonsArray);
  }

  return (
    <View>
      <Modal
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationOutTiming={1500}
        isVisible={show}
        style={{ justifyContent: "flex-end", flex: 1 }}
      >
        <View
          style={{
            height: "20%",
            backgroundColor: "white",
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "800" }}>
            {" "}
            Select Gender
          </Text>
          <RadioGroup
            labelStyle={{ backgroundColor: "red" }}
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
            layout={"row"}
          />
        </View>
      </Modal>
    </View>
  );
}

export { GenderSelector };
