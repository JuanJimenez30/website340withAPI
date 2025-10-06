package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository //annotated as a repository lowest level of connection to the database
//sql queries are in here and if we need extra ones they go here.
public interface weird_AnimalsRepository extends JpaRepository<weird_Animals, Long> {

    List<weird_Animals> getAnimalsBySpecies(String species);

    //custom query to search by habitat
    @Query(value = "select * from weird_Animals s where s.habitat like %?1%", nativeQuery = true)
    List<weird_Animals> getAnimalsByHabitat(String habitat);

    //custom query to search by name
    @Query(value = "select * from weird_Animals s where s.name like %?1% ", nativeQuery = true)
    List<weird_Animals> getAnimalsByName(String name);
}
