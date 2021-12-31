import { View } from "react-native";
import React, { useContext, useState } from "react";

import { ProjectContext } from "./ProjectProvider";
import { Box, Input, Text } from "native-base";

const ProjectPicker = () => {
  const { project, setProject } = useContext(ProjectContext);
  const [inner, setInner] = useState(project);

  return (
    <Box>
      <View testID={`field/project`}>
        <Input
          testID="project-selector"
          value={inner}
          onChangeText={setInner}
          onEndEditing={() => {
            setProject(inner);
          }}
        />
        <Text>
          Currently using project "{project}". Type your project slug here to
          use this app with your project.
        </Text>
      </View>
    </Box>
  );
};

export default ProjectPicker;
