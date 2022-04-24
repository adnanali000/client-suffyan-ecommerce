import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const FormTextField = ({ name, label }) => {
  const { control } = useFormContext()
  return (
    <Grid xs={12} sm={6}>
      <Controller
        defaultValue=""
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            name={name}
            label={label}
            required
          />
        )}
      />
    </Grid>
  )
}

export default FormTextField