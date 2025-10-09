package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController //connects controller to service highest level of connection to the outside world
public class weird_AnimalsController {

  @Autowired
  private weird_AnimalService weird_AnimalService; //connects controller to service

  /**
   * Endpoint to get all weird animals
   *
   * @return List of all weird animals
   */
  @GetMapping("/weird-animals") //show everything in the weird animals table or filter by habitat
  public Object getAllWeirdAnimals(@RequestParam(value = "habitat", required = false) String habitat) {
    if (habitat != null && !habitat.isEmpty()) {
      return weird_AnimalService.getWeirdAnimalsByHabitat(habitat);
    } else {
      return weird_AnimalService.getAllWeirdAnimals();
    }
  }

  /**
   * Endpoint to get a weird animal by ID
   *
   * @param id The ID of the weird animal to retrieve
   * @return The weird animal with the specified ID
   */
  @GetMapping("/weird-animals/{id}") //find weird animal by id
  public weird_Animals getWeirdAnimalById(@PathVariable long id) {
    return weird_AnimalService.getWeirdAnimalById(id);
  }

  /**
   * Endpoint to get weird animals by name
   *
   * @param name The name of the weird animal to search for
   * @return List of weird animals with the specified name
   */
  @GetMapping("/weird-animals/name")
public Object getWeirdAnimalsByName(@RequestParam String key) {
    if (key != null) {
        return weird_AnimalService.getWeirdAnimalsByName(key);
    } else {
        return weird_AnimalService.getAllWeirdAnimals();
    }
}

    /**
     * Endpoint to get weird animals by habitat
     *
     * @param habitat The habitat of the weird animal to search for
     * @return List of weird animals with the specified habitat
     */
  @GetMapping("/weird-animals/habitat") //search for weird animals by habitat
  public Object getWeirdAnimalsByHabitat(@RequestParam(value = "key", required = false) String key) {
      if (key != null && !key.isEmpty()) {
          return weird_AnimalService.getWeirdAnimalsByHabitat(key);
      } else {
          return weird_AnimalService.getAllWeirdAnimals();
      }
  }

    /**
     * Endpoint to get weird animals by species
     *
     * @param species The species of the weird animal to search for
     * @return List of weird animals with the specified species
     */
    @GetMapping("/weird-animals/species/{species}") //search for weird animals by species
    public Object getWeirdAnimalsBySpecies(@PathVariable String species) {
        if (species != null) {
            return weird_AnimalService.getWeirdAnimalsBySpecies(species);
        } else {
            return weird_AnimalService.getAllWeirdAnimals();
        }

    }

  /**
   * Endpoint to add a new animal
   *
   * @param animal The animal to add
   * @return List of all animals
   */
  @PostMapping("/weird-animals") //takes a request body and adds it to the weird animals table
  public Object addWeirdAnimal(@RequestBody weird_Animals animal) {
    return weird_AnimalService.addWeirdAnimal(animal);
  }

  /**
   * Endpoint to update a weird animal
   *
   * @param id      The ID of the weird animal to update
   * @param animal  The updated weird animal information
   * @return The updated weird animal
   */
  @PutMapping("/weird-animals/{id}") //update weird animal by id
  public weird_Animals updateWeirdAnimal(@PathVariable Long id, @RequestBody weird_Animals animal) {
    weird_AnimalService.updateWeirdAnimal(id, animal);
    return weird_AnimalService.getWeirdAnimalById(id);
  }

  /**
   * Endpoint to delete a weird animal
   *
   * @param id The ID of the weird animal to delete
   * @return List of all weird animals
   */
  @DeleteMapping("/weird-animals/{id}") //delete weird animal by id
  public Object deleteWeirdAnimal(@PathVariable Long id) {
    weird_AnimalService.deleteWeirdAnimal(id);
    return weird_AnimalService.getAllWeirdAnimals();
  }

  /**
   * Endpoint to write a weird animal to a JSON file
   *
   * @param animal The weird animal to write
   * @return An empty string indicating success
   */
  @PostMapping("/weird-animals/writeFile") //writes a weird animal object to a json file
  public Object writeJson(@RequestBody weird_Animals animal) {
    return weird_AnimalService.writeJson(animal);
  }

  /**
   * Endpoint to read a JSON file and return its contents
   *
   * @return The contents of the JSON file
   */
  @GetMapping("/weird-animals/readFile") //reads a json file and returns the weird animal object
  public Object readJson() {
    return weird_AnimalService.readJson();
  }

}
