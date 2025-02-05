import { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Play, Upload, RefreshCw } from "lucide-react"
import { mockData } from "./mockData"
import "./App.css"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
})

function App() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [username, setUsername] = useState("")
  const [filteredData, setFilteredData] = useState(mockData)

  const handleDateFilter = () => {
    let filtered = mockData

    if (startDate || endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.created_at)
        const isAfterStart = !startDate || itemDate >= startDate
        const isBeforeEnd = !endDate || itemDate <= endDate
        return isAfterStart && isBeforeEnd
      })
    }

    if (username) {
      filtered = filtered.filter((item) =>
        item.user_name.toLowerCase().includes(username.toLowerCase())
      )
    }

    setFilteredData(filtered)
  }

  const handlePlay = (fileUri) => {
    console.log("Playing audio:", fileUri)
    // Audio playback implementation would go here
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Call Analysis Dashboard
          </Typography>

          <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button variant="contained" onClick={handleDateFilter} startIcon={<RefreshCw size={18} />}>
              Apply Filter
            </Button>
            <Button variant="contained" color="primary" startIcon={<Upload size={18} />}>
              Upload
            </Button>
            <Button variant="outlined" onClick={() => setFilteredData(mockData)}>
              Show All
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>S.No</TableCell>
                  <TableCell>Audio</TableCell>
                  <TableCell>File Name</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell>Intent</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => handlePlay(row.file_uri)}>
                        <Play size={16} />
                      </Button>
                    </TableCell>
                    <TableCell>{row.filename}</TableCell>
                    <TableCell>{row.user_name}</TableCell>
                    <TableCell>{row.intent}</TableCell>
                    <TableCell>{(row.score * 100).toFixed(1)}%</TableCell>
                    <TableCell>{new Date(row.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </ThemeProvider>
  )
}

export default App