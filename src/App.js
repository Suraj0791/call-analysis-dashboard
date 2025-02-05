import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
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
  const [filteredData, setFilteredData] = useState(mockData)

  const handleDateFilter = () => {
    if (!startDate && !endDate) {
      setFilteredData(mockData)
      return
    }

    const filtered = mockData.filter((item) => {
      const itemDate = new Date(item.created_at)
      const isAfterStart = !startDate || itemDate >= startDate
      const isBeforeEnd = !endDate || itemDate <= endDate
      return isAfterStart && isBeforeEnd
    })

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
            <div className="date-picker-container">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="date-picker"
              />
            </div>
            <div className="date-picker-container">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="date-picker"
              />
            </div>
            <Button variant="contained" onClick={handleDateFilter} startIcon={<RefreshCw size={18} />}>
              Apply Filter
            </Button>
            <Button variant="contained" color="primary" startIcon={<Upload size={18} />}>
              Upload
            </Button>
            <Button variant="outlined">Show All</Button>
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

