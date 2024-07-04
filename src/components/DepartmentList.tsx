import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, List, ListItem, IconButton, Collapse } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';


const departmentData = [
  {
    "department": "customer_service",
    "sub_departments": [
      "support",
      "customer_success"
    ]
  },
  {
    "department": "design",
    "sub_departments": [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selected, setSelected] = useState<{ [key: string]: string[] }>({});

 
  const handleExpandClick = (department: string) => {
    setExpanded(prev => prev === department ? false : department);
  };

 
  const handleSelectAll = (department: string) => {
    setSelected(prev => {
      const isAllSelected = prev[department]?.length === departmentData.find(d => d.department === department)?.sub_departments.length;
      if (isAllSelected) {
        const { [department]: _, ...rest } = prev;
        return rest;
      } else {
        return {
          ...prev,
          [department]: departmentData.find(d => d.department === department)?.sub_departments || []
        };
      }
    });
  };

  
  const handleSelectSubDepartment = (department: string, subDepartment: string) => {
    setSelected(prev => {
      const isSelected = prev[department]?.includes(subDepartment);
      if (isSelected) {
        return {
          ...prev,
          [department]: prev[department].filter(sd => sd !== subDepartment)
        };
      } else {
        return {
          ...prev,
          [department]: [...(prev[department] || []), subDepartment]
        };
      }
    });
  };

  return (
    <Box>
      <List>
        {departmentData.map(({ department, sub_departments }) => (
          <Box key={department}>
           
            <ListItem>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected[department]?.length === sub_departments.length}
                    indeterminate={selected[department]?.length > 0 && selected[department]?.length < sub_departments.length}
                    onChange={() => handleSelectAll(department)}
                    inputProps={{ 'aria-label': `${department} select all` }}
                  />
                }
                label={department}
              />
              <IconButton onClick={() => handleExpandClick(department)} aria-label={expanded === department ? 'collapse' : 'expand'}>
                {expanded === department ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </ListItem>
           
            <Collapse in={expanded === department} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {sub_departments.map(subDepartment => (
                  <ListItem key={subDepartment}>
                    
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selected[department]?.includes(subDepartment) || false}
                          onChange={() => handleSelectSubDepartment(department, subDepartment)}
                          inputProps={{ 'aria-label': subDepartment }}
                        />
                      }
                      label={subDepartment}
                      style={{ paddingLeft: 40 }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default DepartmentList;
