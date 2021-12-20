import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import { DateTimePicker } from '@mui/lab';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Autocomplete, Card, CardActions, CardContent, Container, Grid, TextField, AppBar, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';

import { listarLocadoras, LocadoraResp } from "../hooks/locadoras/service"
import { useFormik, } from 'formik';
import { useRouter } from 'next/dist/client/router';
import Navbar from 'components/navbar';






interface props { locadoras: [LocadoraResp] }

const Home: React.FC<props> = ({ locadoras }) => {
  const router = useRouter()
  const formik = useFormik({

    initialValues: {

      cidade: 'cwb',

      dataHoraRetirada: new Date(),

      dataHoraDevolucao: new Date(),

    },

    onSubmit: values => {
      const { cidade, dataHoraRetirada, dataHoraDevolucao } = values
      const url = `/reservas?cidade=${cidade}&dataHoraRetirada=${dataHoraRetirada.toISOString()}&dataHoraDevolucao=${dataHoraDevolucao.toISOString()}`
      router.push(url)

    },

  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("cidade", (event.target as HTMLInputElement).value);
  };



  return (

    <div >
      <Head>
        <title>Rent a car - Protótipo</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ flexGrow: 1 }}>
        <Navbar />
      </Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Container>
            <Grid container>
              <Grid item xs={12}>

                <Typography variant="h3">
                  Pesquise, Compare e Alugue
                </Typography>

                <Typography variant="h4">
                  Aluguel de carros com os melhores preços
                </Typography>

              </Grid>
              <Grid item xs={12}>
                <Box sx={{marginTop: 8}} borderColor="primary.main">

                  <Card variant="outlined">
                    <CardContent>
                      <Box >
                        <Typography variant="h5">
                          Retire seu carro em:
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                          <RadioGroup sx={{ flexDirection: 'row' }}
                            aria-label="Cidade"
                            defaultValue="Curitiba"
                            name="radio-buttons-cidade"
                            value={formik.values.cidade}
                            onChange={handleChange}
                          >
                            <FormControlLabel value="cwb" control={<Radio />} label="Curitiba" />
                            <FormControlLabel value="gyn" control={<Radio />} label="Goiânia" />
                          </RadioGroup>


                          <DateTimePicker
                            label="Data e Hora da retirada"
                            value={formik.values.dataHoraRetirada}
                            onChange={formik.handleChange}
                            renderInput={(params: any) => <TextField {...params} />}
                          />
                          <DateTimePicker
                            label="Data e Hora da devolução"
                            value={formik.values.dataHoraDevolucao}
                            onChange={formik.handleChange}
                            renderInput={(params: any) => <TextField {...params} />}
                          />
                          <Button variant="contained" type="submit">Pesquisar</Button>
                        </form>
                      </Box>


                    </CardContent>

                  </Card>

                </Box>

                <Box sx={{marginTop: 8}}  borderColor="danger">

                  <Card>
                    <CardContent>
                      <Typography variant="h4">
                        Locadoras
                      </Typography>


                      <Grid container >
                        {locadoras.length > 0 && locadoras.map((locadora, key) =>

                          <Grid item sx={{ padding: '20px' }} key={key}>
                            <Box sx={{ 'display': 'flex', flexDirection: 'column', textAlign: 'center' }}>
                              {locadora.nome}
                              <img width="100" src={locadora.logo.toString()} />
                            </Box>
                          </Grid>

                        )}
                      </Grid>
                    </CardContent>
                  </Card>

                </Box>

              </Grid>
            </Grid>




          </Container>
        </Box>
      </LocalizationProvider>

      <footer>

      </footer>
    </div>
  )
}

export async function getStaticProps() {



  return {
    props: {
      locadoras: await listarLocadoras()
    },
  }
}

export default Home
