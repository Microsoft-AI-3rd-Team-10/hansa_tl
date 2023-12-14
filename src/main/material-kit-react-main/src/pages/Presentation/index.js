// @mui material components
import React, { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/bg-hansa.jpg";
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress"

function HeaderOne() {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(bgImage);
  const [OCRText,setOCRTextContent] = useState("漢字");
  const [TLText,setTLTextContent] = useState("한글");
  const [isImageUploadClick, setIsImageUploadClick] = useState(false);
  const [isOCRClick, setOCRClick] = useState(false);
  const [isTLClick, setTLClick] = useState(false);
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [loadingTL, setLoadingTL] = useState(false);
  const fileInputRef = useRef(null);
  const ImageAddress = 'http://localhost:8080/api/img'
  const OCRAddress = 'http://localhost:8080/api/OCR'
  const TLAddress = 'http://localhost:8080/api/tl'

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('Selected File:', file);
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('filename', file.name);

      axios.post(ImageAddress, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          console.log('Image uploaded successfully:', response.data);
          // Add any additional logic after successful upload
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          // Handle error scenarios
        });
      setIsImageUploadClick(true);
    }
  };
    const handleOCRButtonClick = () => {
      if (file && isImageUploadClick) {
        setOCRClick(true);
        setLoadingOCR(true); // Set loading state to true

        const filename = file.name;
        axios.get(OCRAddress, {
          params: {
            filename: filename,
          },
        })
        .then((response) => {
          setOCRTextContent(response.data); // Update state with fetched text data
          setLoadingOCR(false); // Set loading state to false after successful response
        })
        .catch((error) => {
          console.error('Error fetching text data:', error);
          setLoadingOCR(false); // Set loading state to false on error
        });
      } else {
        console.error('No file selected for OCR');
      }
    };

    const handleTSButtonClick = () => {
      if (file && isOCRClick) {
        setTLClick(true);
        setLoadingTL(true); // Set loading state to true

        const filename = file.name;
        axios.get(TLAddress, {
          params: {
            filename: filename,
          },
        })
        .then((response) => {
          setTLTextContent(response.data); // Update state with fetched text data
          setLoadingTL(false); // Set loading state to false after successful response
          setOCRClick(false);
          setIsImageUploadClick(false);
          setTLClick(false);
        })
        .catch((error) => {
          console.error('Error fetching text data:', error);
          setLoadingTL(false); // Set loading state to false on error
        });
      } else {
        console.error('No file selected for TL');
      }
    };
  const handleFileUploadButtonClick = (e) => {
      // Simulate a click on the hidden file input

      fileInputRef.current.click();
//      e.preventDefault();
  };
  return (
    <MKBox component="header" position="relative">
      <MKBox component="nav" position="absolute" top="0.5rem" width="100%">
        <Container>
          <Grid container flexDirection="row" alignItems="center">
            <MKTypography
              component={Link}
              href="#"
              variant="button"
              color="white"
              fontWeight="regular"
              py={0.8125}
              mr={2}
            >
              고문서 한글 번역
            </MKTypography>
            <MKButton
              variant="outlined"
              color="white"
              sx={{ display: { xs: "block", lg: "none" }, ml: "auto" }}
            >
              <MKBox component="i" color="white" className="fas fa-bars" />
            </MKButton>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              my={0}
              mx="auto"
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Home
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  About Us
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  color="white"
                  fontWeight="regular"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  Contact Us
                </MKTypography>
              </MKBox>
            </MKBox>
            <MKBox
              component="ul"
              display={{ xs: "none", lg: "flex" }}
              p={0}
              m={0}
              sx={{ listStyle: "none" }}
            >
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-twitter" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-facebook" />
                </MKTypography>
              </MKBox>
              <MKBox component="li">
                <MKTypography
                  component={Link}
                  href="#"
                  variant="button"
                  p={1}
                  onClick={(e) => e.preventDefault()}
                >
                  <MKBox component="i" color="white" className="fab fa-instagram" />
                </MKTypography>
              </MKBox>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} md={8} lg={6} flexDirection="column" justifyContent="center">
            <MKTypography
              variant="h2"
              color="white"
              mb={3}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["1xl"],
                },
              })}
            >
              고문서 한글 번역
            </MKTypography>
            <MKBox>
              <Container>
                <Grid container spacing={4} alignItems="center">
                  {/* Image Box */}
                  <Grid item xs={12} md={6}>
                   <Stack spacing={1}>
                    <MKBox
                      component="img"
                      src={imagePreviewUrl}
                      alt="Your Alt Text"
                      width="100%"
                      height="100%"
                      borderRadius="4px" // Optional: Add borderRadius
                    />
                    <label
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <MKButton
                        className="uploadButton"  // Added a specific class for the button
                        color="dark"
                        size="medium"
                        onClick={handleFileUploadButtonClick}
                        sx={{
                          width: '120px',  // Set the width of the button
                          height: '40px',  // Set the height of the button
                          margin: 'auto',  // Center horizontally
                          marginTop: '10px',  // Adjust vertically
                        }}
                      >
                        파일 업로드
                      </MKButton>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </label>
                  </Stack>
                </Grid>

                  {/* Text Boxes and Buttons */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={2}>
                      {/* Text Box 1 */}
                      <MKTypography
                      variant="h5"
                      color="light"
                      fontWeight="bold"
                      sx={{ width: '300%', overflow: 'hidden'}}>
                        <div dangerouslySetInnerHTML={{ __html: OCRText.replace(/\n/g, '<br>') }} />
                      </MKTypography>
                      <label>
                        <MKButton
                          color="light"
                          onClick={handleOCRButtonClick}
                        >
                          OCR
                        </MKButton>
                        {loadingOCR && (
                            <CircularProgress
                              sx={{
                                color: 'blue',  // Set the color to white
                                marginLeft: '10px',  // Adjust horizontal spacing
                                width: '24px',  // Set the width of the circular progress
                                height: '24px',  // Set the height of the circular progress
                              }}
                              size={24}  // Set the size using the size prop
                            />
                          )}
                      </label>
                      {/* Text Box 2 */}
                      <MKTypography
                        variant="h6"
                        color="white"
                        sx={{ mb: 8, width: '350%', overflow: 'hidden' }}
                      >
                        {TLText}
                      </MKTypography>
                      <label>
                      <MKButton color="light" onClick={handleTSButtonClick}>번역</MKButton>
                      {loadingTL && (
                      <CircularProgress
                        sx={{
                          color: 'blue',  // Set the color to white
                          marginLeft: '10px',  // Adjust horizontal spacing
                          width: '24px',  // Set the width of the circular progress
                          height: '24px',  // Set the height of the circular progress
                        }}
                        size={24}  // Set the size using the size prop
                      />
                    )}
                      </label>
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderOne;
