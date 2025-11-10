package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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

}
