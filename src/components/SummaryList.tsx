import { List, ListItem, Paper, Typography } from '@mui/material';

export interface SummaryItem {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items: SummaryItem[];
}

export function SummaryList({ title, items }: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        height: '100%',
        p: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>

      <List
        dense
        sx={
          {
            // border: '1px solid',
          }
        }
      >
        {items.map((item, index) => {
          return (
            <ListItem
              key={item.label + String(index)}
              sx={{
                // alignContent: 'baseline',
                // alignContent: 'bottom',
                // alignItems: 'bottom',
                // border: '1px solid',
                alignItems: 'baseline',
              }}
            >
              <Typography
                // variant="h2"
                variant="h5"
                // variant="body1"
                component="div"
                fontWeight="bold"
                // gutterBottom
                sx={{
                  marginRight: 2,
                }}
              >
                {item.value}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                // gutterBottom
                sx={
                  {
                    //
                  }
                }
              >
                {item.label}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
