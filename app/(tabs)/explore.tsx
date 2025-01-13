import { StyleSheet } from 'react-native';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function ExploreScreen() {
  const [selectedDate, setSelectedDate] = useState(null);

  const bookAppointment = (service, date) => {
    const appointmentCharge = 20;
    const totalCharge = service.price + appointmentCharge;
    
    const newAppointment = {
      id: Date.now(),
      service: service.title,
      date: date,
      price: totalCharge,
      type: 'appointment'
    };

    // Add to bills storage
    addToBills(newAppointment);
  };

  return (
    <ScrollView style={styles.container}>
      {services.map((service) => (
        <ServiceCard 
          key={service.id}
          service={service}
          onBook={(date) => bookAppointment(service, date)}
        />
      ))}
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
    fontFamily: 'Inter-Bold',
  },
  servicesContainer: {
    padding: 16,
    gap: 16,
  },
  serviceCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    marginBottom: 12,
  },
  servicePrice: {
    fontSize: 24,
    fontFamily: 'Inter-Medium',
  },
});