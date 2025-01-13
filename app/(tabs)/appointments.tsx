import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AppointmentsScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { id: 1, title: 'Patch Test', basePrice: 75 },
    { id: 2, title: 'Medical Drug Allergy Test', basePrice: 100 },
    { id: 3, title: 'Autoimmune Screen', basePrice: 150 },
  ];

  const bookAppointment = async (service: { id: any; title: any; basePrice: any; }) => {
    const appointmentCharge = 20;
    const totalCharge = service.basePrice + appointmentCharge;

    const appointment = {
      id: Date.now(),
      serviceId: service.id,
      serviceName: service.title,
      date: selectedDate.toISOString(),
      basePrice: service.basePrice,
      appointmentCharge,
      totalCharge,
      status: 'pending'
    };

    try {
      const existingBills = await AsyncStorage.getItem('bills') || '[]';
      const billsArray = JSON.parse(existingBills);
      billsArray.push(appointment);
      await AsyncStorage.setItem('bills', JSON.stringify(billsArray));
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Book Your Appointment
        </Text>
      </View>

      <View style={styles.datePickerContainer}>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>Select Date</Text>
        </TouchableOpacity>
        <Text style={styles.selectedDate}>
          Selected: {selectedDate.toLocaleDateString()}
        </Text>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          minimumDate={new Date()}
          onChange={(event: any, date: React.SetStateAction<Date>) => {
            setShowDatePicker(false);
            if (date) setSelectedDate(date);
          }}
        />
      )}

      <View style={styles.servicesContainer}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => {
              setSelectedService(service);
              bookAppointment(service);
            }}
          >
            <Text style={styles.serviceTitle}>{service.title}</Text>
            <Text style={styles.servicePrice}>
              Base Price: ${service.basePrice}
            </Text>
            <Text style={styles.appointmentCharge}>
              Appointment Charge: $20
            </Text>
            <Text style={styles.totalPrice}>
              Total: ${service.basePrice + 20}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  datePickerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  dateButton: {
    backgroundColor: Colors.light.tint,
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  dateButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedDate: {
    marginTop: 10,
    fontSize: 16,
  },
  servicesContainer: {
    padding: 20,
  },
  serviceCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicePrice: {
    fontSize: 16,
    color: Colors.light.tint,
  },
  appointmentCharge: {
    fontSize: 16,
    color: Colors.light.tint,
    marginTop: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: Colors.light.tint,
  },
});
sgp_fd1b4edb60bf82b8_bfbeb66756c9033e72005e5ce075bb8b57fdc473