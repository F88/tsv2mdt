import { Grid, Paper, Stack, Typography } from '@mui/material';

export interface SummaryItem {
  label: string;
  value: string;
}

interface Props {
  title: string;
  items: SummaryItem[];
}

export function SummaryGrid({ title, items }: Props) {
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

      <Grid
        container
        marginLeft={2}
        spacing={2}
        size={{
          xs: 12,
        }}
        sx={
          {
            // border: '1px solid #e0e0e0',
          }
        }
      >
        {items.map((item, index) => {
          return (
            <Grid
              key={String(index) + item.label}
              // direction={'column'}
              size={{
                xs: 6,
                sm: 6,
                md: 12,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="baseline">
                <Typography
                  // variant="h2"
                  variant="h5"
                  // variant="body1"
                  // component="div"
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
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
