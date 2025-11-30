import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
} from "@mui/material";
import Header from "../../components/Header";

// Array of bake images with descriptions
const bakeImages = [
  { 
    id: 1, 
    filename: "1.jpg", 
    title: "Chocolate Chip Cookies",
    description: "Classic homemade chocolate chip cookies with a perfect balance of crispy edges and chewy centers. Made with real butter and premium chocolate chips.",
    ingredients: ["Flour", "Butter", "Chocolate Chips", "Sugar", "Eggs", "Vanilla"]
  },
  { 
    id: 2, 
    filename: "2.jpg", 
    title: "Sourdough Bread",
    description: "Artisan sourdough bread with a beautiful golden crust and tangy flavor. This traditional bread is made with a natural starter that's been carefully nurtured.",
    ingredients: ["Sourdough Starter", "Bread Flour", "Water", "Salt"]
  },
  { 
    id: 3, 
    filename: "3.jpg", 
    title: "Blueberry Muffins",
    description: "Moist and fluffy blueberry muffins bursting with fresh berries. Perfect for breakfast or an afternoon snack with a cup of coffee.",
    ingredients: ["Flour", "Blueberries", "Butter", "Sugar", "Eggs", "Milk"]
  },
  { 
    id: 4, 
    filename: "4.jpg", 
    title: "Croissants",
    description: "Buttery, flaky croissants with layers upon layers of delicate pastry. A labor of love that takes time but results in bakery-quality pastries.",
    ingredients: ["Butter", "Flour", "Yeast", "Milk", "Sugar", "Salt"]
  },
  { 
    id: 5, 
    filename: "5.jpg", 
    title: "Apple Pie",
    description: "Traditional apple pie with a flaky crust and sweet-tart filling. Made with fresh apples and warm spices like cinnamon and nutmeg.",
    ingredients: ["Apples", "Pie Crust", "Sugar", "Cinnamon", "Butter", "Lemon"]
  },
  { 
    id: 6, 
    filename: "6.jpg", 
    title: "Cinnamon Rolls",
    description: "Soft and gooey cinnamon rolls with cream cheese frosting. The perfect sweet treat for special occasions or weekend brunches.",
    ingredients: ["Flour", "Cinnamon", "Brown Sugar", "Cream Cheese", "Butter", "Yeast"]
  },
  { 
    id: 7, 
    filename: "7.jpg", 
    title: "Banana Bread",
    description: "Moist banana bread with walnuts and a hint of cinnamon. A great way to use up overripe bananas and create a delicious snack.",
    ingredients: ["Bananas", "Flour", "Walnuts", "Sugar", "Eggs", "Butter"]
  },
  { 
    id: 8, 
    filename: "8.jpg", 
    title: "Pizza Dough",
    description: "Homemade pizza dough that's perfect for creating your own delicious pizzas. Crispy on the outside, chewy on the inside.",
    ingredients: ["Flour", "Yeast", "Olive Oil", "Salt", "Water", "Sugar"]
  },
  { 
    id: 9, 
    filename: "9.jpg", 
    title: "Chocolate Cake",
    description: "Rich and decadent chocolate cake with a moist crumb and intense chocolate flavor. Perfect for celebrations and chocolate lovers.",
    ingredients: ["Chocolate", "Flour", "Sugar", "Eggs", "Butter", "Cocoa Powder"]
  },
  { 
    id: 10, 
    filename: "10.jpg", 
    title: "Focaccia Bread",
    description: "Italian focaccia bread with olive oil, herbs, and sea salt. A versatile bread that's perfect for sandwiches or dipping in olive oil.",
    ingredients: ["Flour", "Olive Oil", "Herbs", "Sea Salt", "Yeast", "Water"]
  },
  { 
    id: 11, 
    filename: "11.jpg", 
    title: "Lemon Bars",
    description: "Tangy lemon bars with a buttery shortbread crust and bright citrus filling. A refreshing dessert that's both sweet and tart.",
    ingredients: ["Lemons", "Butter", "Flour", "Sugar", "Eggs", "Powdered Sugar"]
  },
  { 
    id: 12, 
    filename: "12.jpg", 
    title: "Brioche",
    description: "Rich and tender brioche bread with a golden crust and buttery flavor. This French classic is perfect for French toast or simply enjoyed with butter.",
    ingredients: ["Flour", "Butter", "Eggs", "Sugar", "Yeast", "Milk"]
  },
  { 
    id: 13, 
    filename: "13.jpg", 
    title: "Carrot Cake",
    description: "Moist carrot cake with cream cheese frosting and chopped walnuts. A classic dessert that's both delicious and slightly healthier.",
    ingredients: ["Carrots", "Flour", "Walnuts", "Cream Cheese", "Sugar", "Cinnamon"]
  },
  { 
    id: 14, 
    filename: "14.jpg", 
    title: "Pretzels",
    description: "Soft pretzels with a chewy texture and golden brown crust. Perfect for dipping in mustard or enjoying with a cold beverage.",
    ingredients: ["Flour", "Yeast", "Baking Soda", "Salt", "Water", "Sugar"]
  },
  { 
    id: 15, 
    filename: "15.jpg", 
    title: "Tiramisu",
    description: "Classic Italian tiramisu with layers of coffee-soaked ladyfingers and creamy mascarpone filling. Elegant and indulgent.",
    ingredients: ["Mascarpone", "Ladyfingers", "Coffee", "Eggs", "Sugar", "Cocoa"]
  },
  { 
    id: 16, 
    filename: "16.jpg", 
    title: "Scones",
    description: "Buttery scones with a tender crumb and golden exterior. Perfect for afternoon tea or a quick breakfast on the go.",
    ingredients: ["Flour", "Butter", "Milk", "Sugar", "Baking Powder", "Salt"]
  },
  { 
    id: 17, 
    filename: "17.jpg", 
    title: "Cheesecake",
    description: "Creamy New York style cheesecake with a graham cracker crust. Rich and smooth with a perfect balance of sweetness.",
    ingredients: ["Cream Cheese", "Graham Crackers", "Sugar", "Eggs", "Vanilla", "Butter"]
  },
  { 
    id: 18, 
    filename: "18.jpg", 
    title: "Baguettes",
    description: "Crusty French baguettes with a chewy interior and golden brown crust. The perfect accompaniment to any meal.",
    ingredients: ["Flour", "Yeast", "Water", "Salt", "Sugar"]
  },
];

export default function Bakes() {
  const [selectedBake, setSelectedBake] = useState<typeof bakeImages[0] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBakeClick = (bake: typeof bakeImages[0]) => {
    setSelectedBake(bake);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBake(null);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography variant="h1" sx={{ mb: 2 }}>
            Jessie's Baked Creations
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3 }}>
            A collection of delicious homemade treats and pastries
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "600px" }}>
            Welcome to Jessie's baking showcase! Here you'll find a variety of 
            homemade baked goods, from cookies and cakes to breads and pastries. 
            Each creation is made with love and attention to detail. Click on any item to learn more!
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {bakeImages.map((bake, index) => (
            <Grid size={3} key={bake.id}>
              <Fade in timeout={300 + index * 100}>
                <Card 
                  onClick={() => handleBakeClick(bake)}
                  sx={{ 
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s ease-in-out",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={`/images/bakes/${bake.filename}`}
                    alt={bake.title}
                    sx={{
                      objectFit: "cover",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                    <Typography variant="h6" component="h3">
                      {bake.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Click to learn more
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Dialog for bake details */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          {selectedBake && (
            <>
              <DialogTitle>
                <Typography variant="h4">{selectedBake.title}</Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <img
                      src={`/images/bakes/${selectedBake.filename}`}
                      alt={selectedBake.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Description
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      {selectedBake.description}
                    </Typography>
                    
                    <Typography variant="h6" sx={{ mb: 2 }}>
                      Key Ingredients
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {selectedBake.ingredients.map((ingredient, index) => (
                        <Chip
                          key={index}
                          label={ingredient}
                          variant="outlined"
                          size="small"
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  Close
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </>
  );
} 