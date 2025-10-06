package com.example.demo;

import java.io.IOException;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service //connects service to repository
public class weird_AnimalService {

  @Autowired
  private weird_AnimalsRepository weird_AnimalsRepository;

  /**
   * Method to get all weird animals
   *
   * @return List of all students
   */
  public Object getAllWeirdAnimals() {
    return weird_AnimalsRepository.findAll();
  }

  /**
   * Method to get a weird animal by ID
   *
   * @param animalId The ID of the weird animal to retrieve
   * @return The weird animal with the specified ID
   */
  public weird_Animals getWeirdAnimalById(@PathVariable long animalId) {
    return weird_AnimalsRepository.findById(animalId).orElse(null);
  }

  /**
   * Method to get weird animals by name
   *
   * @param name The name of the weird animal to search for
   * @return List of weird animals with the specified name
   */
  public Object getWeirdAnimalsByName(String name) {
    return weird_AnimalsRepository.getAnimalsByName(name);
  }

  /**
   * Method to get weird animals by habitat
   *
   * @param habitat The habitat of the weird animal to search for
   * @return List of weird animals with the specified habitat
   */
  public Object getWeirdAnimalsByHabitat(String habitat) {
    return weird_AnimalsRepository.getAnimalsByHabitat(habitat);
  }
    /**
     * Method to get weird animals by species
     *
     * @param species The species of the weird animal to search for
     * @return List of weird animals with the specified species
     */
    public Object getWeirdAnimalsBySpecies(String species) {
        return weird_AnimalsRepository.getAnimalsBySpecies(species);
    }
    
  /**
   * Method to add a new weird animal
   *
   * @param weirdAnimal The weird animal to add
   */
  public weird_Animals addWeirdAnimal(weird_Animals weirdAnimal) {
    return weird_AnimalsRepository.save(weirdAnimal);
  }

  /**
   * Method to update a weird animal
   *
   * @param animalId The ID of the weird animal to update
   * @param weirdAnimal The updated weird animal information
   */
  public weird_Animals updateWeirdAnimal(Long animalId, weird_Animals weirdAnimal) {
    return weird_AnimalsRepository.save(weirdAnimal);
  }

  /**
   * Method to delete a weird animal
   *
   * @param animalId The ID of the weird animal to delete
   */
  public void deleteWeirdAnimal(Long animalId) {
    weird_AnimalsRepository.deleteById(animalId);
  }

  /**
   * Method to write a weird animal object to a JSON file
   *
   * @param weirdAnimal The weird animal object to write
   */
  public String writeJson(weird_Animals weirdAnimal) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      objectMapper.writeValue(new File("weirdAnimals.json"), weirdAnimal);
      return "Weird animal written to JSON file successfully";
    } catch (IOException e) {
      e.printStackTrace();
      return "Error writing weird animal to JSON file";
    }

  }

  /**
   * Method to read a student object from a JSON file
   *
   * @return The student object read from the JSON file
   */
  public Object readJson() {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      return objectMapper.readValue(new File("weirdAnimals.json"), weird_Animals.class);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }

  }

}
